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
// {TAJUK} diganti dengan tajuk skrip (versi Full Colour Viral Edition 9:16).
export const PROMPT_THUMBNAIL = `GENERIC SOCIAL MEDIA THUMBNAIL PROMPT — FULL COLOUR VIRAL EDITION

TikTok • Instagram Reels • Facebook Reels

@Create image

ROLE & OBJECTIVE

Act as a world-class social media thumbnail designer, creative director, commercial photographer, and viral content visual strategist.

Create a premium, high-impact vertical social media thumbnail inspired by the attached visual reference.

The design should feature:

* An oversized, bold headline dominating the upper and middle sections.
* A photorealistic portrait of the male subject positioned prominently in the lower-right.
* A vibrant, full-colour background that tells the story of the topic.
* Relevant props, environmental details, and cinematic commercial photography.
* Thick black typography outlines, vivid accent colours, energetic brush strokes, and a premium white outer frame.

The finished thumbnail should look like a professionally art-directed viral social media poster, not a generic AI-generated image.

The attached thumbnail is the DESIGN reference. The attached selfie is the IDENTITY reference. The TITLE determines the entire creative direction.

⸻

1. CANVAS & FORMAT — KEEP THE ORIGINAL SIZE

Create a vertical thumbnail in a 9:16 aspect ratio, targeting 1080 × 1920 pixels.

IMPORTANT:

* Preserve the original 9:16 canvas.
* Do not generate a 3:4 image.
* Do not stretch, squeeze, or crop the canvas into another aspect ratio.
* Design for TikTok, Instagram Reels, and Facebook Reels.
* Keep the subject, headline, and important details within comfortable internal margins.

The composition should resemble the supplied example: a powerful headline at the top and middle, with the main human subject occupying the lower-right and the environment filling the remaining space.

⸻

2. REFERENCE SELFIE — PRESERVE MY REAL IDENTITY

Use the attached selfie or portrait as the primary identity reference for the male subject.

Preserve his real facial identity as accurately as possible, including:

* Facial structure and proportions.
* Skin tone and complexion.
* Eyes, eyebrows, nose, and mouth.
* Hairstyle and hairline.
* Recognisable smile and distinctive facial features.

The subject must look like the same real person in every thumbnail.

Use photorealistic commercial photography. Do not turn the subject into a cartoon, illustration, anime character, or artificial CGI person.

Critical distinction

The reference selfie determines WHO I am, NOT WHAT I wear or HOW I pose.

Do not automatically copy the original selfie outfit, shirt colour, jacket, tie, body posture, hand position, or plain background.

Treat the selfie as an identity reference only.

The wardrobe, pose, expression, hand gestures, props, and environment must be creatively redesigned to match the TITLE.

Do not change my facial identity to fit the creative concept.

⸻

3. TOPIC-BASED WARDROBE TRANSFORMATION — VERY IMPORTANT

For every new thumbnail, analyse the TITLE and deliberately select a different suitable outfit whenever the topic allows.

The subject must look naturally dressed for the specific scene, not like the same photograph pasted into different backgrounds.

Use the following as creative guidance, not fixed uniforms.

Personal finance and financial mistakes

* Smart-casual shirt, fitted blazer, or contemporary business-casual attire.
* Appropriate colours such as charcoal, navy, beige, olive, or muted blue.

Gold savings and wealth building

* Elegant dark blazer, black shirt, cream shirt, or premium business attire.
* Complementary gold accents where appropriate.

Unexpected money, bonuses, or sudden wealth

* Modern smart-casual clothing, a different coloured shirt, or a relaxed blazer.
* Choose an outfit and expression that suit the emotional storyline.

Debt, financial pressure, or money problems

* Understated smart-casual clothing.
* Muted colours and realistic styling appropriate to a serious topic.

Fresh graduates and first jobs

* Modern office-casual clothing, a polo shirt, or a contemporary button-up shirt.
* Dress the subject appropriately for a young professional or working adult.

Family and household finances

* Approachable smart-casual clothing with a relaxed, trustworthy appearance.

Business and entrepreneurship

* Contemporary professional clothing, a fitted blazer, or business-casual attire.

Education and tutorials

* A neat polo shirt, casual button-up shirt, or approachable trainer-style outfit.

These examples are not mandatory. Select the outfit that best fits the exact TITLE.

Wardrobe variation rules

* Change shirt colours, jacket styles, layering, and fabrics across thumbnails.
* Do not automatically reuse the navy blazer, brown shirt, and black tie from the reference selfie.
* Avoid using the same clothing combination in consecutive thumbnails unless it genuinely suits the topic.
* Match the wardrobe to the background lighting and colour palette.
* Keep the outfit realistic, modest, and appropriate for Malaysian cultural settings.
* Men must wear long trousers whenever their lower body is visible.
* Use realistic fabric textures, garment construction, folds, and lighting.

Do not add random accessories, costumes, or exaggerated fashion elements.

FINAL RULE: Preserve my face, but reinvent my outfit to suit each new thumbnail.

⸻

4. POSE, FACIAL EXPRESSION & BODY LANGUAGE

Choose the subject’s pose, facial expression, and hand gestures according to the TITLE.

Do not automatically reproduce the pose in the reference selfie.

Examples:

* Unexpected money: Surprised, intrigued, excited, or thoughtfully evaluating the situation.
* Financial mistakes: Concerned, serious, reflective, or gesturing towards a relevant object.
* Gold savings: Calm confidence, a natural smile, or holding a relevant gold-related prop.
* Debt management: Thoughtful or concerned, with a realistic expression.
* Financial education: Confident, approachable, and engaging.
* Business: Assertive, composed, and professional.

Vary the pose between thumbnails to create visual diversity.

The subject may hold a relevant object, interact with the environment, or use a natural hand gesture when it strengthens the story.

Maintain realistic anatomy, correct finger counts, natural proportions, and believable body language.

Expressions must look authentic rather than exaggerated or cartoonish.

⸻

5. MAIN SUBJECT PLACEMENT — LOWER-RIGHT HERO PORTRAIT

Position the main subject prominently in the LOWER-RIGHT portion of the thumbnail, following the attached design reference.

The subject should generally occupy approximately 35–50% of the composition, depending on the title length.

Requirements:

* Show the face clearly and preserve recognisable identity.
* Use a medium close-up or waist-up portrait where appropriate.
* Allow the shoulders and upper body to extend towards the lower edge without awkward cropping.
* Keep the face away from the outer frame.
* Add a clean, thick WHITE cut-out outline around the subject.
* Add a subtle dark drop shadow for separation.
* Match the subject’s lighting and colour temperature to the environment.
* Integrate the subject naturally with the foreground and background.

The subject may overlap the lower portion of the headline slightly only when the words remain completely readable.

The headline must never cover the eyes, nose, mouth, or other essential facial features.

If the subject holds books, gold bars, documents, or other relevant props, make them realistic and proportionate.

Do not force the subject to hold anything when the TITLE does not call for it.

⸻

6. BACKGROUND — FULL COLOUR, REALISTIC & TOPIC-DRIVEN

The background MUST use full colour.

Do not default to black-and-white photography or grayscale environments.

Create a visually rich, photorealistic setting based on the TITLE. The environment should communicate the subject matter at a glance.

Examples of possible visual environments:

* Financial mistakes: A desk with banknotes, a calculator, bills, a wallet, or credit cards.
* Unexpected money: Malaysian ringgit banknotes, a modern home, an attractive city environment, or a premium lifestyle setting.
* Gold savings: Realistic gold bars, gold coins, sophisticated surfaces, and warm golden reflections.
* Fresh graduates: Modern office buildings, graduation surroundings, work documents, or salary paperwork.
* Debt management: Financial statements, payment reminders, credit cards, and a realistic workspace.
* Retirement: A comfortable home, family environment, retirement documents, or peaceful lifestyle imagery.
* Business: A contemporary office, business district, workspace, or professional environment.
* Family finance: A realistic home interior, household documents, or relatable family setting.

These are examples only. Choose relevant objects and locations according to the actual TITLE.

Background quality

Use:

* Rich full-colour cinematic photography.
* Natural environmental lighting.
* Strong visual depth and perspective.
* Realistic reflections and textures.
* Professional colour grading.
* A clear distinction between foreground, middle-ground, and background.
* Controlled depth of field.
* Visually interesting but believable details.

The background should be vibrant enough to attract attention but must not compete excessively with the headline or portrait.

Avoid random luxury cars, piles of cash, gold bars, or other objects that have no meaningful connection to the topic.

Use only props that reinforce the story.

Do not include piggy banks, piggy-bank illustrations, or piggy-bank imagery.

Any background human figures must be dressed modestly. Women must wear hijabs and modest clothing where applicable. Men must wear long trousers.

⸻

7. COLOUR PALETTE — ADAPT TO EVERY TITLE

Use a deliberate, high-impact colour palette based on the TITLE and its emotional tone.

Do not force every thumbnail to use the same background colour.

Possible combinations include:

* Yellow + red + black: Financial mistakes, warnings, and attention-grabbing educational topics.
* Gold + black + cream: Wealth, gold savings, and premium finance.
* Blue + white + yellow: Trust, education, and financial planning.
* Green + black + white: Growth, progress, and financial stability.
* Orange + navy + white: Energy, opportunity, and personal development.
* Red + white + black: Risk, mistakes, and strong warnings.
* Teal + orange + navy: Modern, vibrant, professional storytelling.

Use one dominant palette with two or three supporting accent colours.

The background, clothing, headline, and graphic accents must complement one another.

Use colour contrast to separate the subject from the environment.

The final thumbnail should be colourful, bold, and cohesive, not a random mixture of saturated colours.

⸻

8. HEADLINE DESIGN — LARGE, BOLD & DOMINANT

The TITLE is the main graphic element and must dominate the UPPER and MIDDLE sections of the thumbnail.

Use the exact wording provided in the TITLE section at the end of this prompt.

Headline styling

Use:

* Oversized bold condensed typography inspired by Anton, Bebas Neue, Impact, or similar display fonts.
* Thick BLACK outlines around the letters.
* Strong but controlled drop shadows.
* High-contrast YELLOW, WHITE, RED, or ORANGE lettering.
* Dynamic red brush strokes or paint splashes behind selected words.
* Selective distressed textures where appropriate.
* Strong line breaks and balanced text alignment.

Make the most important word or number significantly larger where suitable.

For example, a title beginning with a number such as “5” may feature a huge yellow numeral with a thick black outline.

Use different colours to create a clear hierarchy:

* Main keyword: Yellow.
* Supporting phrase: White.
* Important emphasis: Yellow or orange.
* Optional background accent: Red.

These are guidelines, not fixed rules. Adjust the typography and palette to complement the particular background.

Headline positioning

* Place the headline primarily in the UPPER-LEFT and MIDDLE-LEFT portions.
* Allow the headline to occupy approximately 45–65% of the canvas height when the title requires it.
* Arrange the title into multiple bold, balanced lines.
* Use the available space aggressively without making the design feel cramped.
* Keep the headline visually separate from the subject’s face.
* Ensure all words remain readable on a mobile screen.

IMPORTANT: Do not place the title in a dedicated panel at the bottom. Do not reserve the bottom of the image as an empty text area.

The headline must be part of the main composition, similar to the attached example.

The subject remains in the lower-right, and the background fills the remaining space.

⸻

9. EXACT TITLE TEXT — DO NOT REWRITE

Use the following TITLE exactly as written.

TITLE: {TAJUK}

Rules:

* Preserve the original Bahasa Melayu wording.
* Do not translate the title.
* Do not add promotional phrases or extra words.
* Do not remove words.
* Do not change spelling or punctuation.
* Do not invent a subtitle.
* Do not add watermarks, logos, or unrelated text.
* Do not allow letters to be cut off by the frame.

You may change the line breaks, text alignment, font size, and colour emphasis to achieve the best visual result.

If the title is long, distribute the words over more lines and simplify the decorative graphics where necessary.

Never shrink the entire headline excessively just to fit it into one or two lines.

The full title must remain readable.

⸻

10. PREMIUM WHITE OUTER FRAME

Create a thick, clean WHITE outer frame around all four edges of the thumbnail.

The frame must be clearly visible, similar to a premium printed poster.

Include:

* Consistent white borders.
* A subtle grey inner bevel.
* Soft inner shadows.
* Gentle dimensional highlights.
* Clean, straight edges.

Keep all typography, outlines, shadows, brush strokes, and subject details inside the inner edge of the frame.

Do not allow the frame to cover any part of the headline or face.

Maintain the same frame treatment across the thumbnail series to create consistent visual branding.

⸻

11. MOBILE READABILITY & COMPOSITION

Preserve the full 9:16 canvas and ensure the design remains effective on mobile devices.

Keep:

* The headline in the upper and middle-left.
* The face in the lower-right.
* Important props visible without overcrowding the composition.
* Adequate spacing between the headline and face.
* Comfortable internal margins around the frame.
* The main facial features away from extreme top and bottom edges.

Use the available vertical space effectively.

Do not sacrifice the visual hierarchy simply to make the composition symmetrical.

The image should feel dynamic, with the headline and subject working together as one unified design.

⸻

12. FINAL QUALITY CONTROL

Before finalising the thumbnail, ensure that:

* The original 9:16 canvas is preserved.
* The reference subject remains recognisable.
* The outfit is deliberately changed when appropriate.
* The pose and expression match the TITLE.
* The background is full colour and relevant to the topic.
* The main headline occupies the upper and middle-left.
* The subject occupies the lower-right.
* The title is reproduced accurately and remains readable.
* The white outer frame is consistent.
* The colours are bold, coordinated, and visually appealing.
* The subject is integrated naturally into the scene.
* No piggy banks appear.
* There are no unnecessary objects, misspelled words, distorted hands, or unnatural facial features.

FINAL CREATIVE DIRECTION

Use the attached thumbnail as the composition and design reference.

Use the attached selfie as the identity reference only.

Create a different, topic-specific outfit, pose, expression, environment, and colour palette for each new TITLE.

Keep the same overall design language: bold headline on the upper and middle-left, photorealistic subject on the lower-right, vibrant full-colour storytelling, and a premium white outer frame.

The result must feel like a new, professionally designed thumbnail every time, while maintaining consistent visual branding across the series.`;

export function buatPromptThumbnail(tajuk) {
  return PROMPT_THUMBNAIL.replace("{TAJUK}", () => tajuk);
}
