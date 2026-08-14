# ⚠️ SCOPE — READ BEFORE ANY UI CHANGE

**This repo serves hoursserved.com — ALL PUBLIC MARKETING PAGES.** (homepage, /solutions, /compare, /pricing, /how-it-works, legal pages)

**App routes are PROXIED elsewhere.** vercel.json rewrites /Dashboard, /Events, /Members, /login, /assets etc. to `https://hoursserved.vercel.app/` — which is the **C:\Users\STEVE\Club-service-tracker** React repo.

- Marketing/public page change → edit HERE (Astro: src/pages/*.astro, src/components/*.tsx)
- Logged-in app change → edit C:\Users\STEVE\Club-service-tracker

**BEFORE changing any page:** confirm which repo serves that URL. Do not assume.

**Production branch: `master`** (NOT `main` — this repo uses a different convention from Club-service-tracker). Confirm the branch before committing; verify in Vercel that `master` is the production branch for this project.

---

**⚠️ TAILWIND v4 — COLORS ARE NOT IN tailwind.config.js.**

This repo uses Tailwind CSS v4. Brand colors are defined in `src/styles/global.css` inside the `@theme` block as CSS custom properties (e.g. `--color-brand-teal-on-navy: #2FD3AC`). **Editing colors in `tailwind.config.js` has NO EFFECT** — the config is ignored for color definitions. A class using an undefined token generates no CSS, which renders elements invisible (no background, no text color) rather than throwing an error.

**Before changing any color:** edit `src/styles/global.css` @theme, then verify the hex appears in the built CSS:
`npm run build` then `Select-String -Path .\dist\_astro\*.css -Pattern "<hex>"`

Current brand tokens (global.css @theme):
- `--color-brand-navy: #1E3A5F`
- `--color-brand-teal: #0F6E56` (on light backgrounds)
- `--color-brand-teal-on-navy: #2FD3AC` (on navy backgrounds)

CONTRAST RULE: dark teal #0F6E56 on navy = 1.85:1 FAIL. Bright teal #2FD3AC on navy = 6.04:1 PASS with navy text. Bright teal on white = 1.90:1 FAIL. Use each teal only on its correct background.

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
