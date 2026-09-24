"""Gera a narração do vídeo, uma frase de cada vez.

Cada linha de narration.json vira .cache/vo/<id>.wav (48 kHz, mono).
Só pede ao serviço as linhas que ainda não existem ou cujo texto mudou.

    python scripts/video/tts.py
"""
import asyncio, hashlib, json, pathlib, subprocess, sys

import edge_tts
import imageio_ffmpeg

AQUI = pathlib.Path(__file__).parent
CACHE = AQUI / '.cache' / 'vo'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


async def main():
    cfg = json.loads((AQUI / 'narration.json').read_text(encoding='utf-8'))
    CACHE.mkdir(parents=True, exist_ok=True)
    for linha in cfg['lines']:
        chave = hashlib.sha1(
            f"{cfg['voice']}|{cfg['rate']}|{cfg['pitch']}|{linha['en']}".encode()
        ).hexdigest()[:12]
        wav = CACHE / f"{linha['id']}.wav"
        marca = CACHE / f"{linha['id']}.key"
        if wav.exists() and marca.exists() and marca.read_text() == chave:
            continue
        mp3 = CACHE / f"{linha['id']}.mp3"
        com = edge_tts.Communicate(linha['en'], cfg['voice'], rate=cfg['rate'], pitch=cfg['pitch'])
        await com.save(str(mp3))
        subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', str(mp3),
                        '-ar', '48000', '-ac', '1', str(wav)], check=True)
        marca.write_text(chave)
        print('voz', linha['id'], file=sys.stderr)


# O público que pigarreia no fim da serenata: três vozes diferentes, baixinho.
EXTRAS = [
    ('ahem1', 'en-GB-RyanNeural', 'Ahem.'),
    ('ahem2', 'en-US-BrianNeural', 'Hm-hm.'),
    ('ahem3', 'en-GB-ThomasNeural', 'Ahem.'),
]


async def extras():
    for nome, voz, frase in EXTRAS:
        wav = CACHE / f'{nome}.wav'
        if wav.exists():
            continue
        mp3 = CACHE / f'{nome}.mp3'
        await edge_tts.Communicate(frase, voz, rate='-10%').save(str(mp3))
        subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', str(mp3), '-ar', '48000', '-ac', '1', str(wav)], check=True)
        print('voz', nome, file=sys.stderr)


asyncio.run(main())
asyncio.run(extras())
