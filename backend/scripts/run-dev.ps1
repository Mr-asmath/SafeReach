param(
  [switch]$Install
)

$ErrorActionPreference = "Stop"

$BackendRoot = Split-Path -Parent $PSScriptRoot
$Port = if ($env:PORT) { [int]$env:PORT } else { 5000 }
$UseVenv = $env:USE_BACKEND_VENV -eq "true"
$VenvPython = Join-Path $BackendRoot ".venv\Scripts\python.exe"
$Python = if ($UseVenv -and (Test-Path $VenvPython)) { $VenvPython } else { "python" }

function Stop-PortProcess {
  param([int]$TargetPort)

  $listeners = netstat -ano -p tcp | Select-String "LISTENING" | Where-Object {
    $_.Line -match "[:.]$TargetPort\s+"
  }

  $processIds = @()
  foreach ($listener in $listeners) {
    $parts = $listener.Line.Trim() -split "\s+"
    if ($parts.Length -gt 0) {
      $processIds += [int]$parts[-1]
    }
  }

  $processIds | Sort-Object -Unique | ForEach-Object {
    if ($_ -ne $PID) {
      Write-Host "Stopping existing process on port $TargetPort (PID $_)..."
      Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
  }
}

if ($Install) {
  if ($UseVenv -and -not (Test-Path $VenvPython)) {
    Write-Host "Creating backend virtual environment..."
    python -m venv (Join-Path $BackendRoot ".venv")
    $Python = $VenvPython
  }

  Write-Host "Installing backend dependencies..."
  & $Python -m pip install --upgrade pip
  & $Python -m pip install -r (Join-Path $BackendRoot "requirements.txt")
}

Stop-PortProcess -TargetPort $Port

Write-Host "Starting SafeReach backend on http://localhost:$Port ..."
& $Python (Join-Path $BackendRoot "run.py")
