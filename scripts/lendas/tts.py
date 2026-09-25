"""Narração de uma lenda: cada fala de <lenda>/narracao.json vira
<lenda>/.cache/vo/<id>.wav (48 kHz, mono). Só pede o que mudou.

    python scripts/lendas/tts.py pedro-ines
"""
import asyncio, hashlib, json, pathlib, subprocess, sys, wave

import edge_tts
import imageio_ffmpeg

LENDA = pathlib.Path(__file__).parent / sys.argv[1]
CACHE = LENDA / '.cache' / 'vo'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


async def main():
    cfg = json.loads((LENDA / 'narracao.json').read_text(encoding='utf-8'))
    CACHE.mkdir(parents=True, exist_ok=True)
    for linha in cfg['lines']:
        voz = linha.get('voice', cfg['voice'])
        chave = hashlib.sha1(f"{voz}|{cfg['rate']}|{cfg['pitch']}|{linha['pt']}".encode()).hexdigest()[:12]
        wav, marca = CACHE / f"{linha['id']}.wav", CACHE / f"{linha['id']}.key"
        if not (wav.exists() and marca.exists() and marca.read_text() == chave):
            mp3 = CACHE / f"{linha['id']}.mp3"
            await edge_tts.Communicate(linha['pt'], voz, rate=cfg['rate'], pitch=cfg['pitch']).save(str(mp3))
            # corta o silêncio das pontas para os tempos serem os da voz
            subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', str(mp3), '-af',
                            'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse',
                            '-ar', '48000', '-ac', '1', str(wav)], check=True)
            marca.write_text(chave)
        with wave.open(str(wav)) as w:
            print(f"{linha['id']} {w.getnframes() / w.getframerate():.2f}s")


asyncio.run(main())
