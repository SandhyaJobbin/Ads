# Asset Generation Prompts — AdSentinel Edge-Case Assessment

Use these prompts to generate real media assets, then drop them into `C:\My-workspace\Projects\Work\Goog\demo\assets\` and I'll wire them into the demo (replacing the current CSS/SVG mocks).

All assets are **fictional demo brands** for practice. Real drug names (`semaglutide`) appear only as illustrative policy triggers — swap to fictional names if the demo goes external.

---

## 1. IMAGE — Q1 · "NOIR & CO." spirit-free elixir (non-alcoholic drink that resembles alcohol)

**Tool:** ChatGPT (DALL·E 3) or Canva · **Ratio:** 16:9 landscape

**Prompt:**
> A luxury spirit advertisement photograph, 16:9. A dark premium glass bottle with a gold label reading "NOIR & CO." and small text "SPIRIT-FREE ELIXIR". Dramatic moody lighting, deep navy and amber-gold palette. Behind the bottle, a dim cocktail-lounge party scene: clinking coupe champagne glasses, golden confetti drifting, blurred silhouettes of people toasting. Overlaid elegant serif tagline at the bottom: "Taste the forbidden. 0% alcohol." and a smaller line "Notes of oak, smoke & midnight". The whole image mimics a high-end whisky/gin brand advertisement — seductive, premium, slightly forbidden — yet the product is clearly labelled 0% alcohol.

**Must include:** the "0% alcohol" text and the word "SPIRIT-FREE". **Must avoid:** real brand logos, real people's faces in sharp focus.

---

## 2. IMAGE — Q2 · "NIKKE" sneakers (lookalike brand + hidden text + fake system alert)

**Tool:** ChatGPT (DALL·E 3) or Canva · **Ratio:** 16:9 landscape

**Prompt:**
> A clean sneaker advertisement on a light grey studio background, 16:9 landscape. One bold white-and-black athletic running shoe tilted at a dynamic angle. On the side of the shoe and to the left of it: an original logo, a sharp double-chevron shape like two stacked arrowheads pointing right, solid black. No curved checkmarks, no swooshes, no ticks. The shoe tongue has a small rectangular tab with no text. Large bold black italic text "NIKKE" on the left, with a smaller tagline underneath: "Just do it — our way." Top-left corner: a small smartphone-style system alert box with a red warning icon, reading "Storage almost full" and "Tap to clean now →". Bottom-right edge: small, faint, light-grey text rotated slightly upward, reading "SALE ENDS MIDNIGHT — 90% OFF", easy to miss at first glance. Minimal, flat, premium product-advertisement style.

**Must include:** an original (non-swoosh) logo, the "NIKKE" brand and slogan, the small "90% OFF" edge text, and the fake system-alert popup. **Must avoid:** any curved swoosh or checkmark logo, the word "Nike", any real brand logo. (The first version of this image drifted to the real swoosh because the prompt asked for a mark that "mimics a famous sportswear mark"; the lookalike lesson now rests on the name and slogan.)

---

## 3. VIDEO — Q3 · "vidaMed" telehealth visit (claim spoken, NOT shown)

**Tool:** Google Veo (via OmniRoute) or OpenRouter · **Duration:** ~10–15s · **Ratio:** 16:9

**Prompt:**
> A reassuring telehealth video ad, 16:9, ~12 seconds. A friendly clinician in a video-call frame on a clean blue-toned screen, smiling and speaking to camera. On-screen caption bar at the bottom reads: "Book an online doctor visit — most insurance accepted." The visual is completely clean and compliant — NO drug names, NO prices, NO claims appear on screen anywhere. The critical detail is in the AUDIO/voiceover only: a calm female voice says, "…and if it's right for you, we prescribe semaglutide — shipped to your door, no pharmacy trip needed." Warm, trustworthy healthcare aesthetic, soft light, gentle motion.

**Must include:** the on-screen caption "Book an online doctor visit — most insurance accepted." and the spoken audio line naming "semaglutide". **Must avoid:** any drug name or "no prescription" text appearing visually on screen — the violation must live ONLY in the audio.

---

## 4. VIDEO — Q4 · "LuckySpin" free-to-play casino (looks harmless; risk is on the landing page)

**Tool:** Google Veo (via OmniRoute) or OpenRouter · **Duration:** ~8s · **Ratio:** 16:9

**Prompt:**
> A bright, arcade-style mobile casino game ad, 16:9, ~8 seconds. Three colorful slot-machine reels spinning with symbols (coins, cherries, bells, gold stars), glossy cartoon 3D style, vibrant purple and gold casino colors with a dark violet background. Big glowing text "JACKPOT" flashes. Bottom caption bar: "FREE TO PLAY • NO DEPOSIT". The audio (upbeat, energetic) says: "Spin free, win real cash — cash out to your bank in minutes." The ad itself looks like a harmless free game — nothing about real-money gambling appears visually except the spoken audio line.

**Must include:** the "FREE TO PLAY • NO DEPOSIT" caption and the spoken "win real cash" audio line. **Must avoid:** any on-screen real-money/payment visuals.

---

## 5. (Optional) IMAGE — Q5 · AI-generated "doctor" portrait for the Rejuvacell supplement ad

**Tool:** ChatGPT (DALL·E 3) · **Ratio:** 1:1 square

**Prompt:**
> A headshot of a "doctor" that is clearly AI-generated: a middle-aged man in a white coat with a stethoscope, warm smile, hyper-smooth plastic skin, unnaturally perfect symmetry, slightly uncanny lighting. Neutral pale-blue clinical background. He should look like a synthetic, computer-generated medical authority figure — polished but subtly fake. This portrait is used as a fake endorser in a supplement advertisement.

**Must include:** white coat + stethoscope, visibly synthetic/uncanny quality. **Must avoid:** any real person's likeness.

---

## Wiring notes

- Save files to `C:\My-workspace\Projects\Work\Goog\demo\assets\`.
- Suggested filenames: `q1-elixir.png`, `q2-sneakers.png`, `q3-telehealth.mp4`, `q4-casino.mp4`, `q5-doctor.png`.
- The demo currently renders all creatives as inline SVG/CSS (works offline). Generated assets are optional polish — tell me once they're in `assets/` and I'll swap the mocks for `<img>` / `<video>` tags.
