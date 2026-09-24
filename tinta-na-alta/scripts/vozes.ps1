# Grava as falas do jogo com a voz pt-PT do Windows (Helia, OneCore).
# Lê public/falas.json ({ "id": "texto" }) e escreve public/vozes/<id>.wav.
# O timbre de cada personagem (grave, rouco, rádio) faz-se depois, no jogo.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.DataReader, Windows.Storage.Streams, ContentType = WindowsRuntime]

$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$tipo) {
  $t = $asTask.MakeGenericMethod($tipo).Invoke($null, @($op))
  $t.Wait() | Out-Null
  $t.Result
}

$raiz = Split-Path -Parent $PSScriptRoot
$falas = Get-Content -Raw -Encoding UTF8 (Join-Path $raiz 'public/falas.json') | ConvertFrom-Json
$saida = Join-Path $raiz 'public\vozes'
New-Item -ItemType Directory -Force $saida | Out-Null

$s = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
$voz = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.Language -eq 'pt-PT' } | Select-Object -First 1
if (-not $voz) { throw 'Não há voz pt-PT instalada' }
$s.Voice = $voz
Write-Host "voz: $($voz.DisplayName)"

foreach ($p in $falas.PSObject.Properties) {
  # Só grava as que faltam (apagar o .wav para regravar).
  if (Test-Path (Join-Path $saida "$($p.Name).wav")) { continue }
  $id = $p.Name
  $cfg = $p.Value
  $texto = [string]$cfg.texto
  $vel = if ($cfg.velocidade) { $cfg.velocidade } else { '0%' }
  $tom = if ($cfg.tom) { $cfg.tom } else { '0%' }
  $ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='pt-PT'><voice name='$($voz.DisplayName)'><prosody rate='$vel' pitch='$tom'>$([System.Security.SecurityElement]::Escape($texto))</prosody></voice></speak>"
  $stream = Await ($s.SynthesizeSsmlToStreamAsync($ssml)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
  $n = [uint32]$stream.Size
  $leitor = New-Object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
  $null = Await ($leitor.LoadAsync($n)) ([uint32])
  $bytes = New-Object byte[] $n
  $leitor.ReadBytes($bytes)
  [System.IO.File]::WriteAllBytes((Join-Path $saida "$id.wav"), $bytes)
  Write-Host "  $id"
}
