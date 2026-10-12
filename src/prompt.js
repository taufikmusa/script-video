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
// {TAJUK} diganti dengan tajuk skrip (versi 9:16 Reels/TikTok, foto realistik, wardrobe ikut topik, safe zone 3:4).
export const PROMPT_THUMBNAIL = `GENERIC SOCIAL MEDIA THUMBNAIL PROMPT — TIKTOK, INSTAGRAM REELS & FACEBOOK REELS

@Create image

Create a high-impact social media thumbnail in 9:16 vertical aspect ratio (1080 × 1920 pixels), featuring a thick, premium WHITE outer frame with a subtle dimensional effect.

The design must work for TikTok videos, Instagram Reels, Facebook Reels, and social media profile grids.

IMPORTANT: Keep the original 9:16 canvas. Do not generate a 3:4 image, stretch the composition, or crop the original canvas to fit another aspect ratio.

Prioritise a crop-safe composition so the headline, subject’s face, and essential visual elements remain visible across different social media previews.

1. REFERENCE PHOTO — PRESERVE REAL IDENTITY

Use the attached reference photo of the male subject as the identity reference.

Preserve his real facial identity, facial proportions, skin tone, hairstyle, eyes, nose, smile, and distinctive facial features as accurately as possible.

The subject must look like a REAL HUMAN photographed with a professional camera. NOT a cartoon, NOT a chibi, NOT a 2D vector illustration, and NOT a digitally illustrated character.

His face must remain photorealistic and recognisably consistent with the attached reference photo.

IMPORTANT DISTINCTION: Preserve the person’s identity, NOT his original outfit or pose.

The attached photo determines WHO the subject is. The TITLE determines his clothing, pose, facial expression, hand gestures, and surrounding environment.

Do not automatically reproduce the navy suit, brown shirt, black tie, original hand gesture, or original body pose from the reference photo.

2. TOPIC-BASED WARDROBE TRANSFORMATION — CRITICAL

Choose a new outfit specifically for the TITLE and visual storyline of each thumbnail.

Analyse the topic before deciding what the subject should wear. The clothing must feel natural, believable, and relevant to the scene rather than looking like the same portrait pasted into every design.

Wardrobe selection guidelines:

* Personal finance and financial planning: Smart casual clothing, a well-fitted shirt, a lightweight blazer, or professional business-casual attire.
* Gold savings and wealth building: A premium dark blazer, elegant black shirt, refined business attire, or a sophisticated outfit that complements gold accents.
* Family, marriage, and household finances: A neat smart-casual shirt, relaxed blazer, or approachable family-friendly outfit.
* Retirement and future planning: Mature business-casual clothing, a refined shirt, or a comfortable professional outfit.
* Riders, freelancers, and gig workers: A practical casual jacket, neat polo shirt, or contemporary smart-casual clothing appropriate to the working environment.
* Business and entrepreneurship: Modern business attire, a fitted blazer, or confident professional casual wear.
* Education and tutorials: A clean polo shirt, casual button-up shirt, or approachable trainer-style outfit.
* Emergency funds and financial hardship: Understated smart-casual clothing that suits a serious, realistic financial discussion.

These are creative references, not fixed uniforms. Select the most appropriate outfit based on the exact TITLE and scene.

Wardrobe rules

* Change the shirt, jacket, outerwear, and other appropriate clothing elements when the topic calls for it.
* Vary colours, materials, layering, and styling across thumbnails.
* Choose clothing colours that complement the background and improve subject separation.
* Keep the outfit modest, professional where appropriate, and realistic for Malaysian cultural settings.
* Men must always wear long trousers when their lower body is visible.
* Use realistic fabric textures, natural folds, correct garment construction, and believable lighting.
* Avoid costumes, exaggerated fashion, random accessories, and clothing unrelated to the topic.
* Do not change the subject’s face, hairstyle, skin tone, or recognisable identity to match the wardrobe.
* Do not reuse the exact same outfit by default. Repeat an outfit only when it genuinely suits the new topic.

FINAL WARDROBE RULE: Every thumbnail must make a deliberate, topic-specific wardrobe choice. The subject should look like he belongs in that particular scene.

3. POSE, EXPRESSION AND HAND GESTURES

Choose the subject’s body pose, facial expression, and hand gestures based on the TITLE.

Examples:

* Educational topic: Confident, approachable expression with a natural explanatory gesture.
* Financial warning: Serious, thoughtful expression with a relevant pointing gesture.
* Savings and wealth building: Calm confidence, a subtle smile, and a natural gesture towards a relevant prop.
* Family finance: Warm, reassuring expression and a relaxed, approachable pose.
* Business topic: Confident posture with a professional expression.
* Numbered list such as five tips: Show an appropriate number of fingers only if it looks natural and anatomically correct.

Do not use the same pointing gesture or raised-hand pose for every thumbnail.

Maintain natural anatomy, realistic fingers, believable posture, and consistent facial identity.

4. PREMIUM WHITE FRAME

Create a thick, clean WHITE outer frame around all four edges.

* Use a visibly thick white border.
* Add a subtle light-grey inner bevel, gentle highlights, and a soft dark-grey inner shadow.
* Create a raised, dimensional premium editorial-poster appearance.
* Keep the frame consistent on all four sides.
* Keep all text, outlines, shadows, brush strokes, and subject details inside the inner edge of the frame.
* Do not allow important elements to touch or cross the frame.
* Avoid exaggerated metallic or glossy plastic effects.

5. FOREGROUND — PHOTOREALISTIC MAIN SUBJECT

Position the real human subject prominently in the LOWER-RIGHT portion of the composition.

* Preserve his real facial identity using the attached reference photo.
* Apply the topic-specific wardrobe transformation described above.
* Use realistic skin texture, professional lighting, natural facial details, and believable fabric textures.
* Add a thick WHITE cut-out outline around the subject.
* Add a subtle dark drop shadow for separation from the background.
* Keep his face fully visible and comfortably inside the central safe zone.
* Keep the subject visually prominent without obscuring the headline.
* Ensure natural anatomy, realistic hands, and correct body proportions.
* Keep the subject’s clothing, pose, and expression consistent with the topic.

6. BACKGROUND — BLACK-AND-WHITE RETRO EDITORIAL

Create a photorealistic background inspired by 1980s editorial photography, adapted to the TITLE.

Render the background entirely in BLACK AND WHITE or grayscale, with cinematic contrast, subtle film grain, dramatic lighting, and layered visual depth.

Choose relevant environmental details and props based on the topic. These may include financial documents, calculators, money, gold bars, vehicles, office equipment, family settings, houses, or other appropriate objects.

Keep the background slightly subdued so the colourful headline and photorealistic subject stand out.

Any human figures in the background must be dressed modestly. Women must wear hijabs and modest clothing where applicable. Men must wear long trousers.

Avoid irrelevant objects, distracting details, and visual clichés.

NO PIGGY BANKS.

7. HEADLINE DESIGN — BOLD AND HIGH-CONTRAST

Place the headline prominently in the CENTER-LEFT area of the composition, with the subject on the lower-right.

* Primary hook: Massive YELLOW and/or RED lettering with a thick BLACK outline.
* Secondary line: Large WHITE lettering with a strong BLACK stroke.
* Remaining words: Punchy YELLOW or ORANGE lettering.
* Use a bold condensed display font similar to Anton, Bebas Neue, or Impact.
* Use restrained red brush-stroke accents and subtle shadows.
* Arrange the headline into balanced lines with professional spacing.
* Keep all text readable on a mobile phone screen.

Use the exact TITLE provided below in Bahasa Melayu. Do not add, remove, translate, paraphrase, or change any words. Preserve the original spelling and punctuation.

If the title is long, use additional lines or reduce the font size slightly rather than allowing text to extend towards the edges.

8. CRITICAL SAFE ZONE — REELS AND PROFILE GRID

Keep the original 9:16 canvas at 1080 × 1920 pixels.

Design all essential elements — headline, subject’s face, and key props — inside the CENTRAL 3:4 area, corresponding to the middle 75% of the canvas height.

* Central profile-grid safe zone: approximately 1080 × 1440 pixels.
* Top background-only area: approximately 240 pixels.
* Bottom background-only area: approximately 240 pixels.
* Keep the headline, subject’s face, and other essential content inside the central 1440-pixel-high region.
* Leave the top and bottom background-only areas free of headline text and the subject’s face.
* Keep the headline within the central 60–65% of the canvas width.
* Leave at least 8% horizontal margin on both sides between the text and the inner edge of the frame.
* Keep all letters, outlines, shadows, brush strokes, and decorative effects within the safe zone.
* Do not crop, stretch, or distort any text or facial features.

The background may extend throughout the full canvas.

9. COMPOSITION AND IMAGE QUALITY

* Original 9:16 vertical canvas, 1080 × 1920 pixels.
* Thick, dimensional WHITE outer frame.
* Topic-specific wardrobe and pose for every thumbnail.
* Photorealistic subject positioned on the lower-right.
* Black-and-white editorial background.
* Bold yellow, white, red, and orange headline.
* White cut-out outline and subtle drop shadow around the subject.
* Strong contrast, cinematic lighting, crisp details, and premium editorial quality.
* Balanced spacing between the headline, subject, and background.
* No cropped words, distorted hands, duplicated fingers, or unnatural facial features.

10. TITLE

{TAJUK}

11. FINAL IDENTITY AND STYLING RULE

The attached photo determines WHO the subject is.

The TITLE determines WHAT he wears, HOW he poses, WHAT expression he makes, WHAT gesture he performs, and WHERE the scene takes place.

Preserve the subject’s real facial identity while allowing creative changes to his wardrobe, pose, and environment.

FINAL PRIORITY: Accurate facial identity, topic-specific wardrobe transformation, professional photorealism, a balanced 9:16 composition, and complete headline visibility inside the central 3:4 safe zone.`;

export function buatPromptThumbnail(tajuk) {
  return PROMPT_THUMBNAIL.replace("{TAJUK}", () => tajuk);
}
