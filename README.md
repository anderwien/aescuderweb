# Alejandro Escuder Static Portfolio

A new static Astro portfolio site for music, teaching, projects, writing, and contact. The WordPress reference package is used only as a visual identity source; this project does not depend on WordPress or port the WordPress theme.

## Stack

- Astro
- Markdown and MDX content collections
- Local fonts
- Plain CSS with design tokens
- No backend
- No CMS
- No WordPress dependency

## Local Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Editing Content In Obsidian

Open the project root as the Obsidian vault:

```txt
<project-root>
```

In this project, the root is the folder that contains `package.json`, `.git/`, `src/`, and `.github/`. This lets the Obsidian Git plugin see the repository root. Do not open only `src/content/` if you want Obsidian Git to commit and push correctly.

For normal website editing, only change Markdown or MDX files inside:

```txt
src/content/
```

Each folder inside `src/content/` is an Astro content collection:

- `src/content/site/`
- `src/content/pages/`
- `src/content/projects/`
- `src/content/music/`
- `src/content/writing/`

There is also a templates folder:

- `src/content/_templates/`

Normal updates should be made by editing Markdown or MDX files in these folders. You should not need to touch Astro components for ordinary content changes.

Recommended Obsidian workflow:

1. Open the whole project folder as the vault.
2. Edit content in `src/content/`.
3. Use Obsidian Git to pull before starting work.
4. Commit manually with a clear message.
5. Push from Obsidian Git.
6. GitHub Actions builds and deploys the site automatically after the push.

Avoid committing generated or technical folders such as `node_modules/`, `dist/`, and `.astro/`. They are ignored by Git.

## Obsidian Git Settings

Recommended settings for the Obsidian Git plugin:

- Pull on startup: enabled.
- Pull before push: enabled.
- Push after commit: enabled.
- Commit method: manual commit preferred.
- Auto-commit: disabled or set to a conservative interval.
- Auto-push: avoid aggressive auto-push for public website content.

This gives you a calm editorial workflow: write, review, commit, push, then let GitHub deploy.

## Obsidian Vault Settings

This project ignores `.obsidian/` by default so private workspace state, local plugin settings, open panes, and device-specific preferences do not get published to GitHub.

If you later want to share a minimal Obsidian setup across machines, commit only deliberate files, for example:

```txt
.obsidian/community-plugins.json
.obsidian/plugins/obsidian-git/
```

Do not commit workspace files, cache files, or settings containing private paths or tokens.

## Edit The Header, Footer, And Site Tree

The header and footer are controlled by Markdown files:

- `src/content/site/settings.md`
  - brand name
  - brand tagline
  - logo path
  - footer text
- `src/content/site/tree.md`
  - main navigation labels
  - route URLs
  - navigation order

Example navigation item:

```yaml
mainNav:
  - label: "Music"
    href: "/music"
    order: 2
```

This gives you one clear place to edit the site tree without touching Astro code.

Submenus are also controlled here. Add `children` to a navigation item:

```yaml
mainNav:
  - label: "Projects"
    href: "/projects"
    order: 4
    children:
      - label: "NoSoloNotas"
        href: "/projects/no-solo-notas"
        order: 1
```

On desktop, children appear as a hover dropdown. On mobile, the menu collapses into a button and children open inside the dropdown.

## Edit A Page Title, Subtitle, Hero, Or Buttons

Open the Markdown file for the page in `src/content/pages/`.

For example, the homepage is:

```txt
src/content/pages/home.md
```

Useful frontmatter fields:

```yaml
title: "Alejandro Escuder"
description: "Short SEO and fallback description."
eyebrow: "Pianist · Composer · Teacher"
heroTitle: "Alejandro Escuder"
heroSubtitle: "Visible subtitle in the hero."
heroImage: "/images/piano-portrait.jpg"
heroImages:
  - "/images/piano-portrait.jpg"
  - "/images/composing.jpg"
  - "/images/stage-piano.jpeg"
heroActions:
  - label: "Music"
    href: "/music"
    variant: "filled"
  - label: "Teaching"
    href: "/teaching"
  - label: "Thought"
    href: "/writing"
aboutTitle: "A short homepage bio section title."
aboutDescription: "A short homepage bio section subtitle."
aboutImage: "/images/composing.jpg"
aboutCtaLabel: "Read full biography"
aboutCtaHref: "/about"
playlistTitle: "Featured listening"
playlistDescription: "Playlist text"
```

For normal pages, changing `title`, `description`, and `heroImage` updates the visible page header. The homepage additionally uses `heroTitle`, `heroSubtitle`, `heroImages`, and `heroActions`.

## Add A Static Page

Create a Markdown file in `src/content/pages/`.

Example:

```md
---
title: "Teaching"
description: "Teaching philosophy, lessons, workshops, and music education projects."
order: 3
heroImage: "/images/inside-harp.jpg"
seoTitle: "Teaching"
seoDescription: "Teaching, lessons, workshops, and educational projects by Alejandro Escuder."
---

Write the page content here.
```

The required pages are currently wired as explicit routes: `/about`, `/teaching`, and `/contact`. Adding a totally new page also requires adding a matching route in `src/pages/`.

The page header uses the page frontmatter:

- `title`
- `description`
- `heroImage`
- `seoTitle`
- `seoDescription`

If `heroImage` is omitted, the site uses the default manuscript/music image.

## Add A Project

Create a Markdown file in `src/content/projects/`.

```md
---
title: "Project title"
description: "Short project summary."
featured: false
order: 4
coverImage: "/images/composing.jpg"
url: "https://example.com"
year: "2026"
role: "Artist / Educator"
tags:
  - Music education
  - Research
---

Write the project description here.
```

The file name becomes the route slug. For example, `new-project.md` becomes `/projects/new-project/`.

## Add A Music Item

Create a Markdown file in `src/content/music/`.

```md
---
title: "Work title"
description: "Short description of the work, recording, score, or process note."
year: "2026"
type: "Composition"
category: "Concert music"
featuredGroup: "concert"
coverImage: "/images/piano-portrait.jpg"
audioUrl: "/audio/work-preview.mp3"
scoreUrl: "/scores/work-preview.pdf"
storeUrl: "https://example.com/store"
tags:
  - concert
  - piano
  - contemporary
featured: false
order: 5
---

Optional notes about the work.
```

Music items appear on `/music`, sorted by `order`. Set `featured: true` to include the work in the homepage Featured Listening player. Use `featuredGroup: "concert"` or `featuredGroup: "media"` to place it under Concert music or Music for media.

## Edit About Bio, Career Lines, CV, And Timeline

Open `src/content/pages/about.md`.

- `heroActions` creates the About hero buttons.
- `bioVersions` controls the Short, Long, and Fun biography toggle.
- `careerLines` controls the career-line explorer.
- `timeline` powers the interactive React timeline with multiple events per year.

PDFs or other downloadable files should be placed in `public/docs/` and linked as `/docs/file-name.pdf`.

## Add A Writing Post

Create a Markdown or MDX file in `src/content/writing/`.

```md
---
title: "Essay title"
description: "Short essay description."
date: 2026-02-01
tags:
  - Listening
  - Practice
draft: false
---

Write the essay here.
```

The file name becomes the route slug. For example, `essay-title.md` becomes `/writing/essay-title/`.

Set `draft: true` to keep a post out of the writing archive and production routes.

The writing detail route `/writing/[slug]/` is the blog-post template. Every new Markdown or MDX file in `src/content/writing/` automatically uses that template.

## Use The Markdown Templates

Copy a file from `src/content/_templates/` into the relevant collection:

- `_templates/page.md` to `pages/`
- `_templates/project.md` to `projects/`
- `_templates/music.md` to `music/`
- `_templates/writing-post.md` to `writing/`

Then rename the copied file. The file name becomes the URL slug for projects and writing posts.

## Images And Assets

Reusable identity assets live in `public/images/`.

Use public image paths in frontmatter:

```yaml
coverImage: "/images/composing.jpg"
```

Local fonts live in `public/fonts/` and are loaded in `src/styles/global.css`.

## Design Tokens

Design tokens are defined in `src/styles/global.css`:

- colors
- font families
- spacing
- border radius
- max widths

The site uses the existing visual identity: warm paper, deep ink, subtle borders, Instrument Serif, Open Sauce Two, black-and-white photography, and restrained blue accents.

## Production Deployment

Build the site locally:

```bash
npm run build
```

GitHub Actions also builds the site on every push to `main`.

The included workflow is:

```txt
.github/workflows/deploy.yml
```

It runs:

```bash
npm ci
npm run build
```

If the Spaceship FTP secrets are configured in GitHub, it then uploads `dist/` to the server.

Required GitHub repository secrets:

```txt
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
FTP_TARGET_DIR
```

`FTP_TARGET_DIR` should be the correct folder for your domain on Spaceship hosting. Depending on the hosting setup, this may be `public_html/` or a domain-specific folder.

Manual fallback:

```bash
npm run build
```

Then upload the contents of `dist/` to the correct folder in Spaceship.

The production site is static HTML, CSS, and assets. No server runtime or database is required.

## Troubleshooting

### Obsidian sees too many technical files

That is expected when opening the project root. Use Obsidian's file explorer carefully and edit only `src/content/`. You can also collapse technical folders such as `src/`, `public/`, `.github/`, and `node_modules/`. The important editable content is in `src/content/`.

### Obsidian Git cannot find the repository

Make sure the vault is the project root, not `src/content/`. The vault folder must contain the `.git/` directory.

### GitHub Action does not run

Confirm that you pushed to the `main` branch and that the workflow file exists at `.github/workflows/deploy.yml`. In GitHub, check the repository's Actions tab and make sure Actions are enabled.

### Build fails after editing Markdown

Most build failures come from invalid frontmatter. Check that YAML uses quotes around complex values, lists are indented correctly, dates are valid, and required fields are present. Run `npm run build` locally before pushing if you want to catch errors early.

### Merge conflicts

Pull before editing and before pushing. If two machines edit the same Markdown file, Obsidian Git may show a conflict. Resolve the conflict in the Markdown file, keep the version you want, then commit the resolved file.
# aescuderweb
