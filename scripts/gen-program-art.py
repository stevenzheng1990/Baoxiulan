#!/usr/bin/env python3
"""Generate 8 elegant hand-drawn line illustrations via OpenAI images API."""
import base64
import json
import os
import sys
import urllib.request
from pathlib import Path

API_KEY = os.environ["OPENAI_API_KEY"]
OUT_DIR = Path("/home/user/Baoxiulan/public/programs")
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE = (
    "Single-line continuous-stroke hand-drawn illustration, elegant minimal line art, "
    "thin even black ink lines on pure white background, no shading, no color fill, "
    "no text, no labels, no watermark, generous whitespace, centered composition, "
    "professional editorial line drawing in the style of a fine medical journal, "
    "subject occupies about 60% of the frame, calm and dignified mood, square format."
)

PROMPTS = {
    "early": (
        "A simple line drawing of a peaceful baby sleeping in a wooden cradle, "
        "with a small mobile of three shapes (star, moon, heart) hanging above. "
        + STYLE
    ),
    "inclusion": (
        "A simple line drawing of four small children sitting in a circle on a round rug, "
        "with a teacher kneeling among them holding a picture card. "
        + STYLE
    ),
    "speech": (
        "A simple line drawing of a kind female therapist seated at a small table, "
        "holding up a picture flashcard toward a young child who looks at it attentively, "
        "with a small speech bubble. "
        + STYLE
    ),
    "motor": (
        "A simple line drawing of a young child walking on a low wooden balance beam "
        "with both arms outstretched for balance, a therapy ball resting on the floor nearby. "
        + STYLE
    ),
    "behavior": (
        "A simple line drawing of a small hand selecting one card from a row of four "
        "picture-exchange cards (with simple icons of sun, heart, checkmark, circle), "
        "a small star above as a reward. "
        + STYLE
    ),
    "sensory": (
        "A simple line drawing of a child sitting inside a cocoon-shaped therapy swing "
        "suspended from the ceiling by two ropes, the swing gently mid-motion. "
        + STYLE
    ),
    "ot": (
        "A simple line drawing of a child's hand using a precise pincer grip "
        "to pick up a small wooden bead from a tabletop, several wooden blocks "
        "and threading beads arranged neatly on the table. "
        + STYLE
    ),
    "tuina": (
        "A simple line drawing of a child lying peacefully on their side on a massage table, "
        "two gentle therapist hands above the child's back applying pediatric tuina massage. "
        + STYLE
    ),
}


def gen(slug: str, prompt: str) -> None:
    out = OUT_DIR / f"{slug}.png"
    if out.exists() and out.stat().st_size > 5000:
        print(f"  skip (exists): {out}")
        return
    body = json.dumps({
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": "1024x1024",
        "n": 1,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    print(f"→ {slug} ...", flush=True)
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        print("  HTTPError:", e.code, e.read().decode()[:400])
        return
    item = data["data"][0]
    if "b64_json" in item:
        out.write_bytes(base64.b64decode(item["b64_json"]))
    elif "url" in item:
        with urllib.request.urlopen(item["url"], timeout=60) as r2:
            out.write_bytes(r2.read())
    else:
        print("  unexpected response:", list(item.keys())); return
    print(f"  saved {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    items = list(PROMPTS.items())
    if len(sys.argv) > 1:
        items = [(s, PROMPTS[s]) for s in sys.argv[1:] if s in PROMPTS]
    for slug, prompt in items:
        gen(slug, prompt)
