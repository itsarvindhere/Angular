# i18n-final

Sample project for the **Internationalization** notes. It shows every idea from the notes in one small page, in three languages: English (source), French and Spanish.

| Note | Where to see it |
|------|-----------------|
| 001 Introduction and setup | `ng add @angular/localize` was run, see `polyfills` in `angular.json` and `types` in `tsconfig.app.json` |
| 002 Marking text | [`src/app/app.html`](src/app/app.html) sections 1 and 2: `i18n`, `ng-container`, `i18n-placeholder`, `i18n-title`, meaning, description and `@@` ids |
| 002 Text in code | [`src/app/app.ts`](src/app/app.ts): `$localize` for the greeting and the document title |
| 003 Plurals and select | `app.html` section 4: ICU `plural` and `select` |
| 004 Extracting and translating | [`src/locale/`](src/locale): `messages.xlf` (source), `messages.fr.xlf`, `messages.es.xlf` |
| 005 Building and deploying | `i18n` block and the `fr` / `es` configurations in [`angular.json`](angular.json) |
| 006 Formatting dates and numbers | `app.html` section 5: `date`, `currency`, `number` and a pipe with a locale argument |

## Run it

```bash
npm install

# one language at a time (the dev server can only serve one locale)
npm run start        # English
npm run start:fr     # French
npm run start:es     # Spanish
```

## Build every language

```bash
npm run build
```

This writes one folder per language to `dist/i18n-final/browser/`: `en-US`, `fr` and `es`. The language links at the top of the page point at these folders (`/en-US/`, `/fr/`, `/es/`), so they only work when the build output is served from one root, not with `ng serve`. Any static file server will do, for example:

```bash
npx http-server dist/i18n-final/browser
```

## Change or add text

1. Change the text in a template or in `$localize`.
2. `npm run extract-i18n` writes a fresh `src/locale/messages.xlf`.
3. Copy the new units into each `messages.<locale>.xlf` and add a `<target>` to each one.
4. `npm run build`. A missing translation fails the build, because `i18nMissingTranslation` is set to `error`.

Texts that have a custom id (`@@bookVerb`, `@@welcomeMessage`, ...) keep their id when the English text is edited. Texts without one get a new id, so their translations must be redone.

## Add another language

1. Add it to `i18n.locales` in `angular.json`.
2. Copy `messages.xlf` to `messages.<locale>.xlf` and translate it.
3. Add a `<locale>` configuration to `build` and `serve`, like the existing `fr` and `es` ones.

The French and Spanish translations were written for this demo and have not been reviewed by a native speaker.
