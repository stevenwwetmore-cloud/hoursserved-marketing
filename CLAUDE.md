# ⚠️ SCOPE — READ BEFORE ANY UI CHANGE

**This repo serves hoursserved.com — ALL PUBLIC MARKETING PAGES.** (homepage, /solutions, /compare, /pricing, /how-it-works, legal pages)

**App routes are PROXIED elsewhere.** vercel.json rewrites /Dashboard, /Events, /Members, /login, /assets etc. to `https://hoursserved.vercel.app/` — which is the **C:\Users\STEVE\Club-service-tracker** React repo.

- Marketing/public page change → edit HERE (Astro: src/pages/*.astro, src/components/*.tsx)
- Logged-in app change → edit C:\Users\STEVE\Club-service-tracker

**BEFORE changing any page:** confirm which repo serves that URL. Do not assume.

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
