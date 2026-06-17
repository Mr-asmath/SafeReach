param(
  [ValidateSet("install", "build", "start", "dev")]
  [string]$Mode = "start"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$RuntimeRoot = "C:\SafeReachRuntime\frontend"
$NextBin = Join-Path $RuntimeRoot "node_modules\next\dist\bin\next"
$Node20Path = Join-Path $env:NVM_HOME "v20.19.0"
$Port = 3000

if ($env:NVM_HOME -and (Test-Path (Join-Path $Node20Path "node.exe"))) {
  $env:Path = "$Node20Path;$env:Path"
}

function Copy-ProjectFiles {
  New-Item -ItemType Directory -Path $RuntimeRoot -Force | Out-Null

  foreach ($file in @(
    "package.json",
    "next.config.ts",
    "postcss.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "next-env.d.ts",
    "yarn.lock"
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

function Stop-PortProcess {
  param([int]$TargetPort)

  if ($env:OS -ne "Windows_NT") {
    return
  }

  $netstatOutput = netstat -ano | Select-String -Pattern "LISTENING" | Select-String -Pattern ":$TargetPort\s"
  $processIds = @()

  foreach ($line in $netstatOutput) {
    if ($line.Line -match "^\s*TCP\s+\S+:$TargetPort\s+\S+\s+LISTENING\s+(\d+)\s*$") {
      $processIds += [int]$Matches[1]
    }
  }

  $processIds | Sort-Object -Unique | ForEach-Object {
    if ($_ -ne $PID) {
      Write-Host "Stopping existing process on port $TargetPort (PID $_)..."
      Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
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
    Stop-PortProcess -TargetPort $Port
    node $NextBin start -p $Port
  } elseif ($Mode -eq "dev") {
    Stop-PortProcess -TargetPort $Port
    node $NextBin dev -p $Port
  }
} finally {
  Pop-Location
}
