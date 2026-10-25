$node = (Get-Command node).Source
$proc = Start-Process $node -ArgumentList 'node_modules/next/dist/bin/next','dev','-p','3111' -RedirectStandardOutput dev-out.log -RedirectStandardError dev-err.log -PassThru -NoNewWindow
$ready = $false
for ($i = 0; $i -lt 40; $i++) {
  Start-Sleep -Seconds 1
  if ((Get-Content dev-out.log -Raw -ErrorAction SilentlyContinue) -match 'Ready') { $ready = $true; break }
}
Write-Output "ready=$ready"
$slugs = 'what-a-personal-trainer-can-help-with','how-to-choose-a-personal-trainer-hyderabad','gym-home-online-training','personal-trainer-fees-hyderabad','first-month-personal-training'
foreach ($s in $slugs) {
  try { $r = Invoke-WebRequest -Uri "http://localhost:3111/guides/$s" -UseBasicParsing -TimeoutSec 120; Write-Output "$s $($r.StatusCode)" } catch { Write-Output "$s FAIL $($_.Exception.Message)" }
}
Start-Sleep -Seconds 3
Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
Write-Output '===STDOUT==='
Get-Content dev-out.log
Write-Output '===STDERR==='
Get-Content dev-err.log
