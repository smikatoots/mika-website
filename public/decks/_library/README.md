# Deck image library

Reusable images for presentation decks (`/deck/<slug>`). Drop an image here once,
reuse it across every deck. **The filename is the keyword** — name it after the
thing it represents, lowercase, hyphenated.

```
notion.png         → the Notion logo
chatgpt.png        → the ChatGPT logo
linkedin.png       → LinkedIn logo
layoffs.jpg        → a layoffs / job-cuts visual
burnout.jpg        → an overwhelmed / behind feeling
```

## How it's used

When Claude builds a deck from a script, it lists this folder, reads the
filenames, and matches them to the script lines — e.g. a line that mentions
Notion gets `notion.png`. No manifest to maintain; the filenames ARE the index.

## One folder for everything

All deck images live here — there are no per-deck folders. Reusable concepts
(`layoffs.jpg`, `puppet-strings.jpg`) and one-off, deck-specific shots
(`kabuki.jpg`, `rohan-linkedin.png`) sit side by side. Claude lists this single
folder and matches filenames to the script. To avoid collisions across decks,
give a genuinely one-off image a descriptive, specific name.

## Tips

- Keep one concept per file; favor logos and clean, full-bleed-friendly images.
- Optimize before committing (these ship to the browser):
  `node -e "require('sharp')('in.jpg').resize({height:1600,withoutEnlargement:true}).jpeg({quality:80,mozjpeg:true}).toFile('out.jpg')"`
- Use transparent PNGs for logos so they sit cleanly on the white slide.
- Add new names to the list above as you go, so the library is self-documenting.
```
