param(
  [string]$EnvFile = ".env",
  [string]$Repo = ""
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "GitHub CLI is not installed or not available on PATH. Install gh and run 'gh auth login' first."
}

if (-not (Test-Path -LiteralPath $EnvFile)) {
  throw "Env file not found: $EnvFile"
}

$repoArgs = @()
if ($Repo.Trim()) {
  $repoArgs = @("--repo", $Repo)
}

Get-Content -LiteralPath $EnvFile | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith("#") -or -not $line.Contains("=")) {
    return
  }

  $name, $value = $line.Split("=", 2)
  $name = $name.Trim()
  $value = $value.Trim()

  if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
    $value = $value.Substring(1, $value.Length - 2)
  }

  if ($name) {
    Write-Host "Setting GitHub Actions variable: $name"
    gh variable set $name --body $value @repoArgs
  }
}
