// Template prompt gambar "Chibi Sticker Pack" (butang 🎨 pada setiap kad).
// Edit teks template sesuka hati, tapi JANGAN buang penanda {SKRIP} —
// di situ skrip penuh (tajuk + teks) diselit automatik.

export const PROMPT_STIKER = `GENERIC AI CHIBI STICKER PACK GENERATOR — 9 STICKERS

ROLE & OBJECTIVE

Act as a professional character illustrator and sticker pack designer. Using the attached reference image(s) and the copywriting script provided at the end of this prompt, create a cohesive set of exactly 9 unique chibi-style stickers featuring the character(s) from the uploaded reference image(s).

The stickers must visually communicate the meaning, emotions, actions, and key messages of the supplied script.

1. CHARACTER REFERENCE & IDENTITY

Use the attached image(s) as the primary visual reference for the character’s identity and appearance.

* Preserve the character’s recognizable facial features, hairstyle, skin tone, glasses, hijab, clothing characteristics, accessories, and other distinctive details.
* If multiple reference images are provided, identify which character belongs to each image and maintain their individual appearances consistently.
* Do not replace the reference character with a generic or unrelated character.
* Adapt the character into a cute, expressive, high-quality chibi illustration while retaining their recognizable identity.
* Keep the character design, proportions, facial features, line art, and overall illustration style consistent across all nine stickers.
* Preserve culturally appropriate clothing and modesty where applicable.
* Outfits may vary naturally between stickers when appropriate, but retain the character’s core identity.

2. SCRIPT-BASED STICKER CONCEPTS

Read the entire copywriting script carefully before designing the stickers.

Create exactly 9 different sticker concepts that represent the script’s most important messages, expressions, reactions, and situations.

Each sticker should communicate a distinct idea from the script. Select suitable moments such as:

* Excitement, happiness, celebration, or success.
* Agreement, approval, encouragement, or confidence.
* Surprise, curiosity, confusion, or disbelief.
* Thinking, explaining, teaching, or giving advice.
* Love, appreciation, gratitude, or support.
* Pointing, presenting, gesturing, or emphasizing an important message.
* Funny reactions, playful expressions, or relatable situations.
* Concern, disappointment, realization, or reflection.
* A final reaction that reinforces the script’s main takeaway or call to action.

These are examples, not mandatory categories. Choose the nine concepts based on the actual script rather than forcing unrelated emotions or actions into the set.

Arrange the concepts to create a natural visual progression that follows the script’s flow, from the opening message to the final takeaway.

3. TEXT & SPEECH BUBBLES

For each sticker, determine whether a short text caption or speech bubble would improve the message.

* Extract short, meaningful phrases directly from the supplied script whenever possible.
* If necessary, condense a sentence into a short, natural expression without changing its meaning.
* Use colloquial, natural language that matches the original script’s language and tone.
* If the script is in Bahasa Melayu, use natural Bahasa Melayu Malaysia rather than Indonesian expressions.
* If the script is in English, use natural English.
* Keep captions short, punchy, readable, and suitable for chat stickers.
* Use accurate spelling and punctuation.
* Avoid long paragraphs, unnecessary explanations, unrelated catchphrases, and invented promotional claims.
* Do not force text onto every sticker. Some stickers should communicate entirely through facial expressions, poses, and visual storytelling.
* If a call to action exists in the script, represent it visually or use a concise caption where appropriate.

Text accuracy is essential. Render the intended words clearly and legibly. Never generate random letters, gibberish, or misspelled text.

4. CHARACTER POSES & EXPRESSIONS

Give every sticker a unique pose, gesture, facial expression, and visual silhouette.

Use expressive chibi proportions, a slightly oversized head, appealing facial features, clean outlines, and polished cartoon shading.

Match the body language to the meaning of each moment in the script.

Examples include folded arms, pointing toward the viewer, giving a thumbs-up, raising both hands, saluting, facepalming, thinking with a hand on the chin, holding a relevant object, making a heart gesture, or celebrating.

Avoid repeating the same pose, facial expression, or composition across multiple stickers.

Props and visual elements should only be introduced when they genuinely support the script. Do not add random objects or symbols that distract from the message.

5. STICKER DESIGN & VISUAL QUALITY

Create a premium, polished, die-cut sticker aesthetic.

* Cute, expressive, high-quality 2D chibi illustration.
* Clean, confident outlines and smooth, detailed rendering.
* Consistent proportions, colors, lighting, and line weight.
* A thick, clean white die-cut border around every individual sticker.
* Subtle realistic drop shadows to give the stickers a slightly raised, physical sticker appearance.
* Vibrant but harmonious colors that complement the reference character.
* Clear silhouettes with enough spacing between individual stickers.
* No overlapping stickers.
* No cropped heads, hands, feet, accessories, or important text.
* Every sticker must be independently recognizable and visually complete.

6. LAYOUT & COMPOSITION

Arrange exactly nine individual stickers in a neat 3 × 3 grid on a clean, light cream or warm ivory background.

* All nine stickers must be fully visible.
* Give each sticker sufficient negative space and consistent separation.
* Keep the layout balanced, tidy, and suitable for a sticker pack presentation.
* Use a portrait canvas with a high resolution and sharp details.
* Do not add a title, heading, logo, watermark, decorative frame, or extra stickers.
* Do not create a collage of unrelated scenes. Each grid cell must contain one distinct sticker illustration.

7. FINAL QUALITY CHECK

Before generating the final image, verify that:

1. There are exactly nine stickers.
2. Every sticker uses the correct reference character.
3. All nine stickers have distinct poses and expressions.
4. The concepts follow the supplied script.
5. Any visible text is relevant, correctly spelled, and legible.
6. The visual style and character identity remain consistent.
7. Each sticker has a clear white die-cut border.
8. No sticker is cropped, duplicated, or unintentionally overlapping another.
9. The overall result looks like a professionally designed, cohesive chibi sticker collection.

OUTPUT: Generate one complete, high-resolution portrait image containing exactly nine individually designed chibi stickers arranged in a 3 × 3 grid. Prioritize character consistency, script relevance, expressive storytelling, and professional sticker quality.

⸻

COPYWRITING SCRIPT

Use the following script as the creative direction for the nine stickers. Analyse it and generate the sticker concepts automatically.

{SKRIP}`;

// Guna fungsi (bukan .replace dengan string) supaya simbol $ dalam skrip tak rosak
export function buatPromptStiker(skripPenuh) {
  return PROMPT_STIKER.replace("{SKRIP}", () => skripPenuh);
}

// Template prompt thumbnail TikTok (butang 🖼️ pada setiap kad).
// {TAJUK} diganti dengan tajuk skrip. Background & headline ikut tajuk tu.
export const PROMPT_THUMBNAIL = `A TikTok grid thumbnail (3:4 aspect ratio) featuring an anime-style main character integrated into a vibrant 3D Chibi miniature background.

1. FOREGROUND - ANIME STYLE CHARACTER:
Transform the uploaded reference photo into a high-quality, modern 2D anime-style character. Retain the original person's hairstyle, clothing, and pose, but render the face and body completely in anime art style. Position the character in the lower-middle, leaving space for text.

2. BACKGROUND - CHIBI 3D STYLE:
A playful 3D "chibi" miniature world that visually represents the topic of the TITLE at the bottom of this prompt. Render in soft edges and vibrant colors. Include tiny 3D props, mini scenes and tiny chibi characters that clearly relate to the title's subject (for example: houses, cars, stacks of Ringgit money, gold bars, a bank, bills, calculators, family or office scenes) — choose only the elements that genuinely fit the title. Give the tiny chibi characters reactions that match the title's emotion (shocked, worried, happy, relieved, thinking).

3. HEADLINE DESIGN:
At the top in the negative space, use bold, high-contrast Malaysian TikTok typography built from the TITLE below. Use the title's exact words and spelling in Bahasa Melayu (UPPERCASE), without adding or changing words. Split it into 2–3 stacked lines:
- The first key hook (number or most dramatic keyword) in massive yellow/red font with a thick black outline.
- The next line in big white letters with a black stroke.
- The remaining words in punchy yellow/orange lettering.
Stack the text clearly and ensure it fits well within the 3:4 frame. Render every letter correctly and legibly — no gibberish or misspelled text. Do not cover the character's face. No pig/pork-related imagery.

TITLE:
{TAJUK}`;

export function buatPromptThumbnail(tajuk) {
  return PROMPT_THUMBNAIL.replace("{TAJUK}", () => tajuk);
}
