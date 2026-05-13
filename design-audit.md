# Design Audit: WordPress Reference Package

This audit treats the WordPress reference package as a visual identity source only. It should not be used as a layout blueprint for the new Astro site.

## Extracted Color Palette

### Core Identity Colors

| Role | Color | Source / Use |
| --- | --- | --- |
| Warm paper background | `#ECE7E1` | Primary WordPress theme background and logo light background. This is the clearest identity color. |
| Soft off-white | `#FFFFFF` | Secondary surface, text over dark imagery, clean breathing room. |
| Light warm border | `#D4CFC8` | Theme divider and border color. Useful for subtle rules, outlines, card edges, and separators. |
| Muted taupe gray | `#75736E` | Secondary text, placeholders, quiet metadata. |
| Deep ink | `#15151C` | Main text color in the theme. Reads almost black but softer and more editorial than pure black. |
| Logo charcoal | `#333232` | Dominant dark in logo assets. Slightly warmer than the theme ink. |

### Brand Accent Colors Found In Assets

| Role | Color | Source / Use |
| --- | --- | --- |
| Music blue accent | `#157395` | Blue logo variant and home screenshot underline. Use sparingly for active states, links, focus, or one signature detail. |
| Deep green | `#0B4B3F` | Green logo variant. Possible secondary accent for projects, education, or quieter emphasis. |
| Burgundy | `#5C0A0D` | Dark red logo variant. Use very sparingly, if at all, for warm emphasis. |
| Dark manuscript overlay | `#4F4D44` | Dominant sampled color from the home screenshot background treatment. Useful as a photo overlay tone. |
| Deep blue-black shadow | `#121A27` | Sampled from the home screenshot image shadows. Useful for dark image gradients and overlays. |

### Recommended Astro Tokens

```css
:root {
  --color-paper: #ece7e1;
  --color-surface: #ffffff;
  --color-border: #d4cfc8;
  --color-muted: #75736e;
  --color-ink: #15151c;
  --color-charcoal: #333232;
  --color-accent-blue: #157395;
  --color-accent-green: #0b4b3f;
  --color-accent-burgundy: #5c0a0d;
  --color-photo-veil: #4f4d44;
  --color-night: #121a27;
}
```

## Typography Analysis

The package contains two explicit font families:

- `Instrument Serif`: used by the Hideo theme for headings. Elegant, high-contrast, literary, musical, and expressive without feeling old-fashioned.
- `Open Sauce Two`: used by the Hideo theme for body and interface text. Rounded, modern, clear, slightly friendly, and sturdy at medium weights.

The screenshots also show a more performative home-page identity:

- A large editorial serif for the name, visually close to `Instrument Serif`, `Cormorant Garamond`, `Bodoni 72`, or `Playfair Display`.
- A cursive/script tagline on the home screenshot. Closest likely alternatives: `Lobster Two Italic`, `Courgette`, `Kaushan Script`, or `Pacifico`. This should be treated as an optional accent, not a site-wide typeface.

## Likely Font Names Or Closest Alternatives

### Exact Fonts In Package

- `Instrument Serif`
  - Files: `wordpress-reference/theme/theme-reference-hideo/assets/fonts/instrument-serif/`
  - Weights/styles: 400 normal, 400 italic
  - License: SIL Open Font License

- `Open Sauce Two`
  - Files: `wordpress-reference/theme/theme-reference-hideo/assets/fonts/open-sauce-two/`
  - Weights/styles: 500, 700, 800 with italics
  - License: SIL Open Font License

### Closest Alternatives

- Heading serif alternatives: `Cormorant Garamond`, `Playfair Display`, `Libre Baskerville`, `Bodoni Moda`
- Body/UI alternatives: `Inter`, `Manrope`, `Satoshi`, `Avenir Next`, `Helvetica Neue`
- Script accent alternatives: `Lobster Two Italic`, `Courgette`, `Kaushan Script`

Recommendation: use the packaged fonts first. They are already present locally, licensed for embedding, and match the reference theme.

## Font Hierarchy

| Level | Recommended Font | Weight | Size Guidance | Notes |
| --- | --- | --- | --- | --- |
| Hero name / major page title | `Instrument Serif` | 400 | `clamp(4.5rem, 12vw, 8rem)` | Keep large, elegant, and low-line-height. |
| Section title | `Instrument Serif` | 400 | `clamp(3rem, 8vw, 6rem)` | Preserve the oversized editorial feel without copying the WordPress page structure. |
| Article/project title | `Instrument Serif` | 400 | `clamp(2rem, 5vw, 4rem)` | Strong enough for portfolio entries. |
| Pull quote / statement | `Instrument Serif` italic | 400 italic | `clamp(2rem, 5vw, 4rem)` | Good for musician/philosophy moments. |
| Body text | `Open Sauce Two` | 500 | `1rem` to `1.125rem` | The reference body text is relatively bold and confident. |
| Navigation / buttons / metadata | `Open Sauce Two` | 500 or 700 | `0.95rem` to `1.125rem` | Use generous spacing and clear hover states. |
| Labels / categories | `Open Sauce Two` | 700 | `0.8rem` to `0.95rem` | Optional uppercase or small-caps treatment, used sparingly. |

Avoid overusing the script face. If kept, reserve it for one signature line or a small personal flourish.

## Visual Mood

- Editorial, musical, and personal.
- Warm, calm, and slightly analog because of the paper-toned background.
- Sophisticated but approachable: the serif brings artistry, the sans keeps it modern.
- Piano/conservatory atmosphere, reinforced by black-and-white photography and manuscript imagery.
- Quietly intellectual: composition, education, research, and polymath themes all fit the visual system.
- More portfolio/editorial than marketing site.

The identity should feel like a modern artist-scholar portfolio, not a generic musician template.

## Useful Assets

### Logo And Mark Assets

- `wordpress-reference/uploads/LOGO_AE_V_dark.png`
  - AE monogram on dark field. Strongest personal identity asset.
- `wordpress-reference/uploads/LOGO_AE_bigV_light.png`
  - AE monogram on warm paper field.
- `wordpress-reference/uploads/LOGO_AE_H_dark.png`
  - Grand piano icon on dark field.
- `wordpress-reference/uploads/LOGO_AE_bigH_light.png`
  - Grand piano icon on warm paper field.
- `wordpress-reference/uploads/LOGO_AE_H_blue.png`
  - Blue piano-icon variant. Useful as an accent reference.
- `wordpress-reference/uploads/LOGO_AE_H_green.png`
  - Green piano-icon variant. Useful as a secondary accent reference.
- `wordpress-reference/uploads/LOGO_AE_H_dark (2).png`
  - Burgundy/dark red variant. Use cautiously.

Recommendation: convert key logo assets to optimized SVG if source vectors exist. If no vector source exists, use these PNGs only where their square composition makes sense, and consider redrawing a clean SVG version of the AE monogram.

### Photography / Image Assets

- `wordpress-reference/uploads/Foto_piano_bw_off-edited.jpg`
  - Strong black-and-white pianist image. Very useful for an about/biography page.
- `wordpress-reference/uploads/composing.jpg`
  - Color composition/manuscript image with warm paper and deep blue tones. Useful for hero texture or composition-related content.
- `wordpress-reference/uploads/PlayingInsideHarp.jpg`
  - Warm instrument-detail image. Useful for music/process storytelling.
- `wordpress-reference/uploads/207e2c44-f3f5-4154-8dad-24af41e09620-copy.jpg`
  - Black-and-white mountain/lake image. Useful only if it supports a specific project/story.
- `wordpress-reference/uploads/pexels-photo-860662.jpeg`
  - Dark piano/stage image. Useful as a moody secondary visual, but it feels less personal than the original photos.

### Screenshot References

- `wordpress-reference/screenshots/home-desktop.png`
  - Best reference for mood: manuscript background, white display type, blue accent line, pill navigation.
- `wordpress-reference/screenshots/about-desktop.png`
  - Best reference for typography, cream background, black-and-white portrait treatment, and soft rounded image corner.
- `wordpress-reference/screenshots/blog-desktop.png`
  - Best reference for card scale, image rhythm, and the balance between serif headings and sans body text.

## What Should Be Preserved

- Warm paper background as the default page color.
- Deep ink text instead of pure black where possible.
- `Instrument Serif` for large expressive headings.
- `Open Sauce Two` for body, navigation, and UI.
- Oversized serif display moments.
- Black-and-white photography as a recurring language.
- Music manuscript imagery as a brand texture.
- The AE monogram and/or grand piano icon as identity marks.
- Subtle borders using the warm gray palette.
- Rounded media corners, especially large image treatments.
- Small blue accent details, used with restraint.
- The balance of artistry and clarity: expressive headings plus very readable body text.

## What Should NOT Be Copied

- The current WordPress/Hideo layout structure.
- The fixed left sidebar navigation.
- The exact blog grid and card arrangement.
- The WordPress header/footer placement.
- The theme credit and WordPress-specific block patterns.
- Placeholder copy, demo content, or default Hideo pattern content.
- The current page composition as a template.
- Overly literal reuse of pill buttons as the main navigation pattern.
- The YouTube embed appearance shown in the blog screenshot.
- Any styling that exists only because of WordPress block constraints.

The new site should inherit the identity, not the interface.

## Recommendations For A New Astro Static Portfolio Website

1. Build a fresh visual system from tokens
   - Define color, type, radius, spacing, and shadow tokens in global CSS.
   - Keep the palette small: paper, ink, border, muted, white, blue accent.

2. Use local font loading
   - Move the packaged `woff2` files into the Astro asset/public strategy.
   - Use `font-display: swap`.
   - Use `Instrument Serif` for headings and `Open Sauce Two` for all body/UI text.

3. Design the site as an editorial portfolio
   - Prioritize biography, music/compositions, education, projects, writing, and contact.
   - Use large typographic openings and strong image pairings.
   - Let pages feel composed and spacious, but avoid recreating the WordPress sidebar.

4. Treat photography as a first-class identity element
   - Use black-and-white images for authority and continuity.
   - Use manuscript/music imagery as texture, not wallpaper everywhere.
   - Apply overlays carefully so image detail remains visible.

5. Keep accent color disciplined
   - Use `#157395` for links, selected states, focus rings, and one or two signature marks.
   - Avoid making the site blue. The dominant identity is warm paper plus ink.

6. Modernize the layout language
   - Replace the WordPress sidebar with a responsive top navigation or a more bespoke portfolio navigation.
   - Use full-bleed hero or editorial split compositions where appropriate, but do not mirror the reference screens.
   - Consider a homepage that presents Alejandro as musician, educator, creator, and researcher through distinct content bands.

7. Preserve accessibility and performance
   - Ensure strong contrast on cream and image backgrounds.
   - Avoid placing long text over busy manuscript photos.
   - Use Astro image optimization for uploaded photos.
   - Prefer semantic content collections for compositions, projects, posts, and quotes.

8. Make the identity feel personal
   - Use the AE monogram as the primary mark.
   - Use the piano icon as a secondary motif.
   - Let copy, photography, and typography communicate the polymath identity more than decorative layout.

## Implementation Notes For Later

- Do not port PHP or WordPress block markup.
- Do not reuse Hideo templates as Astro components.
- Extract design tokens and assets only.
- Use Markdown/MDX content as planned.
- Preserve URLs where useful, but design page templates from scratch.
