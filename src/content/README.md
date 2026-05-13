# Content Vault

Open this `src/content/` folder in Obsidian to edit the website content.

Collections:

- `site`: site identity and navigation tree used by the header and footer.
- `pages`: home, about, teaching, contact, and other static page copy.
- `projects`: portfolio projects.
- `music`: compositions, piano works, recordings, scores, and music-related items.
- `writing`: essays and articles.
- `_templates`: copy/paste starting points for new Markdown files. This folder is not published.

Keep frontmatter simple and valid. Images should usually point to files in `public/images/`, using paths like `/images/piano-portrait.jpg`.

## Site Tree

Edit `site/tree.md` to change the header/footer navigation:

```yaml
mainNav:
  - label: "About"
    href: "/about"
    order: 1
```

Edit `site/settings.md` to change the visible brand name, tagline, logo, or footer text.

Submenus are supported with `children`:

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

## Page Headers

For normal pages, the header title, description, and image come from the Markdown frontmatter:

```yaml
title: "About"
description: "Biography and artistic positioning."
heroImage: "/images/piano-portrait.jpg"
```

If `heroImage` is missing, the site uses a default music-manuscript image.

For the homepage, edit `pages/home.md`:

```yaml
heroTitle: "Alejandro Escuder"
heroSubtitle: "Visible subtitle"
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
aboutTitle: "Short biography section title"
aboutImage: "/images/composing.jpg"
playlistTitle: "Featured listening"
playlistDescription: "Playlist text"
```

## About Page Extras

Edit `pages/about.md` to manage the bio toggles, career-line explorer, interactive timeline, and hero buttons:

```yaml
heroActions:
  - label: "Bio"
    href: "#biography"
bioVersions:
  short: "Short biography"
  long: "Long biography"
  fun: "Fun biography"
timeline:
  - year: "2016"
    events:
      - title: "Selected moment"
        description: "Timeline text"
```
