param(
  [ValidateSet("install", "build", "start", "dev")]
  [string]$Mode = "start"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$RuntimeRoot = Join-Path $env:TEMP "safereach_frontend_install"
$NextBin = Join-Path $RuntimeRoot "node_modules\next\dist\bin\next"

function Copy-ProjectFiles {
  New-Item -ItemType Directory -Path $RuntimeRoot -Force | Out-Null

  foreach ($file in @(
    "package.json",
    "next.config.ts",
    "postcss.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "next-env.d.ts"
  )) {
    $source = Join-Path $ProjectRoot $file
    if (Test-Path $source) {
      Copy-Item -LiteralPath $source -Destination (Join-Path $RuntimeRoot $file) -Force
    }
  }

  foreach ($dir in @("app", "components", "lib", "pages", "public", "scripts")) {
    $source = Join-Path $ProjectRoot $dir
    $destination = Join-Path $RuntimeRoot $dir
    if (Test-Path $source) {
      robocopy $source $destination /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
      if ($LASTEXITCODE -gt 7) {
        throw "Failed to sync $dir to runtime folder. Robocopy exit code: $LASTEXITCODE"
      }
    } elseif (Test-Path $destination) {
      Remove-Item -LiteralPath $destination -Recurse -Force
    }
  }
}

function Install-RuntimeDependencies {
  Copy-ProjectFiles
  Push-Location $RuntimeRoot
  try {
    yarn install --network-timeout 600000 --ignore-engines --registry https://registry.yarnpkg.com
  } finally {
    Pop-Location
  }
}

if ($Mode -eq "install" -or -not (Test-Path $NextBin)) {
  Install-RuntimeDependencies
} else {
  Copy-ProjectFiles
}

Push-Location $RuntimeRoot
try {
  if ($Mode -eq "build") {
    $buildFolder = Join-Path $RuntimeRoot ".next"
    if (Test-Path $buildFolder) {
      Remove-Item -LiteralPath $buildFolder -Recurse -Force
    }
    node $NextBin build
  } elseif ($Mode -eq "start") {
    if (-not (Test-Path (Join-Path $RuntimeRoot ".next\BUILD_ID"))) {
      node $NextBin build
    }
    node $NextBin start -p 3000
  } elseif ($Mode -eq "dev") {
    node $NextBin dev -p 3000
  }
} finally {
  Pop-Location
}
