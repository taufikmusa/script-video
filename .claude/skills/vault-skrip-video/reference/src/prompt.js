// Template prompt gambar "Chibi Sticker Pack" (butang 🎨 pada setiap kad).
// Edit teks template sesuka hati, tapi JANGAN buang penanda {SKRIP} —
// di situ skrip penuh (tajuk + teks) diselit automatik.

export const PROMPT_STIKER = `GENERIC AI CHIBI STICKER PACK GENERATOR — 9 STICKERS (MINIMALIST FLAT DESIGN)

ROLE & OBJECTIVE

Act as a professional character illustrator and sticker pack designer specializing in modern Minimalist Flat Design. Using the attached reference image(s) and the copywriting script provided at the end of this prompt, create a cohesive set of exactly 9 unique chibi-style stickers featuring the character(s) from the uploaded reference image(s).

The stickers must visually communicate the meaning, emotions, actions, and key messages of the supplied script in a minimalist, flat aesthetic.


1. CHARACTER REFERENCE & IDENTITY (FLAT ART ADAPTATION)


Use the attached image(s) as the primary visual reference for the character’s identity and appearance.


* Preserve the character’s recognizable facial features, hairstyle, skin tone, glasses, hijab, clothing characteristics, accessories, and other distinctive details.
* Adapt the character into a cute, expressive, high-quality flat chibi illustration while retaining their recognizable identity.
* Transform the style into a purely 2D Minimalist Flat Design: use solid color blocks with no gradients, no 3D shading, no complex metallic textures, and no intricate highlights. Use clean, confident flat vector-style outlines.
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

3. TEXT, TYPOGRAPHY & SPEECH BUBBLES

For each sticker, determine whether a short text caption or speech bubble would improve the message.


* Extract short, meaningful phrases directly from the supplied script whenever possible.
* If necessary, condense a sentence into a short, natural expression without changing its meaning.
* Use colloquial, natural language that matches the original script’s language and tone.
* If the script is in Bahasa Melayu, use natural Bahasa Melayu Malaysia rather than Indonesian expressions.
* If the script is in English, use natural English.
* Use flat, bold, modern, and playful typography or hand-drawn style fonts that align with a flat design aesthetic. Avoid 3D, metallic, or heavily gradient-textured text.
* Keep captions short, punchy, readable, and suitable for chat stickers.
* Use accurate spelling and punctuation.
* Avoid long paragraphs, unnecessary explanations, unrelated catchphrases, and invented promotional claims.
* Do not force text onto every sticker. Some stickers should communicate entirely through facial expressions, poses, and visual storytelling.
* If a call to action exists in the script, represent it visually or use a concise caption where appropriate.


Text accuracy is essential. Render the intended words clearly and legibly. Never generate random letters, gibberish, or misspelled text.

4. CHARACTER POSES, EXPRESSIONS & FLAT PROPS

Give every sticker a unique pose, gesture, facial expression, and visual silhouette.

Use expressive chibi proportions, a slightly oversized head, appealing facial features, clean outlines, and simplified geometric patterns.

Match the body language to the meaning of each moment in the script.

Examples include folded arms, pointing toward the viewer, giving a thumbs-up, raising both hands, saluting, facepalming, thinking with a hand on the chin, holding a relevant object, making a heart gesture, or celebrating.

Avoid repeating the same pose, facial expression, or composition across multiple stickers.

Props and visual elements (like gold bars, phones, kampung houses, trees) should be introduced ONLY when they genuinely support the script and must be drawn in a flat 2D vector style. Limit detail on background elements to keep them secondary.

5. STICKER DESIGN & VISUAL QUALITY (MINIMALIST FLAT AESTHETIC)

Create a premium, polished, die-cut sticker aesthetic in a Minimalist Flat style.


* Cute, expressive, high-quality 2D flat chibi illustration.
* Completely flat: utilize a retro-contemporary or vibrant solid-color palette with no gradient blends, no 3D bevels, and no naturalistic shadows. Internal shading must be extremely simple block shadows (if any), using limited, non-intricate overlays.
* Clean, confident outlines and flat, bold color rendering.
* Consistent proportions, colors, and line weight.
* A thick, clean white flat die-cut border around every individual sticker, with a very subtle, flat-colored drop shadow offset to give a physical sticker effect without introducing 3D gradients.
* Clear silhouettes with enough spacing between individual stickers.
* No overlapping stickers.
* No cropped heads, hands, feet, accessories, or important text.
* Every sticker must be independently recognizable, simple, and visually complete.


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


1. There are exactly nine stickers in Minimalist Flat Design (2D, no 3D effects/gradients).

2. Every sticker uses the correct reference character with a flat, bold treatment.
3. All nine stickers have distinct poses, expressions, and flat background/prop elements.
4. The concepts follow the supplied script.
5. Any visible text is relevant, correctly spelled, and legible.
6. The visual style and character identity remain consistent.
7. Each sticker has a clear white die-cut border.
8. No sticker is cropped, duplicated, or unintentionally overlapping another.
9. The overall result looks like a professionally designed, cohesive flat-art chibi sticker collection.

OUTPUT: Generate one complete, high-resolution portrait image containing exactly nine individually designed flat-style chibi stickers arranged in a 3 × 3 grid. Prioritize character consistency, flat minimalist design, script relevance, and professional sticker quality.

⸻

COPYWRITING SCRIPT

Use the following script as the creative direction for the nine stickers. Analyse it and generate the sticker concepts automatically.

{SKRIP}`;

// Guna fungsi (bukan .replace dengan string) supaya simbol $ dalam skrip tak rosak
export function buatPromptStiker(skripPenuh) {
  return PROMPT_STIKER.replace("{SKRIP}", () => skripPenuh);
}

// Template prompt thumbnail TikTok (butang 🖼️ pada setiap kad).
// {TAJUK} diganti dengan tajuk skrip (versi B&W 1980s retro + watak flat berwarna).
export const PROMPT_THUMBNAIL = `A TikTok grid thumbnail (3:4 aspect ratio) with a thick WHITE border. The main character is in full color on the right, contrasting against a black-and-white background.



FOREGROUND - FLAT DESIGN CHARACTER (FULL COLOR, RIGHT SIDE):

2D flat vector character in vibrant colors. The character MUST wear glasses. Add a thick white outline and dark drop shadow for a 3D paper cut-out effect. Position on the LOWER-RIGHT.



BACKGROUND - BLACK & WHITE 1980s RETRO:

Photorealistic 1980s retro background rendered entirely in BLACK AND WHITE (grayscale) to make the text pop. Secondary characters MUST observe perfect modesty (hijabs, long sleeves). Include floating retro props (money, gold bars, calculators). NO piggy bank imagery.



HEADLINE DESIGN (DEAD CENTER, VIBRANT COLORS):

Placed perfectly in the CENTER. Bold, premium TikTok typography (UPPERCASE) that pops against the B&W background. Split into center-aligned lines:



First hook: Massive yellow/red font with a thick black outline.



Next line: Big white letters with a black stroke.



Remaining words: Punchy yellow/orange lettering.



Use the exact words and spelling of the TITLE below in Bahasa Melayu — do not add, remove, translate or change any word. Render every letter correctly and legibly, with no gibberish or misspelled text.



TITLE:

{TAJUK}`;

export function buatPromptThumbnail(tajuk) {
  return PROMPT_THUMBNAIL.replace("{TAJUK}", () => tajuk);
}
