# Giada Maria Campolongo — Portfolio

Portfolio personale realizzato con **React 18**, **TypeScript** e **Vite** (v2.0.0).
Un solo albero React prerenderizzato in HTML statico e idratato lato client,
con dati tipizzati, CSS modulare, supporto bilingue **IT/EN**, tema **chiaro/scuro**,
gestione delle preferenze di movimento e schermate reali ispezionabili.

## Caratteristiche principali

- **Prerendering statico + idratazione**: `pnpm build` genera l’HTML completo di tutte le sezioni prima del caricamento JavaScript e lo rende interattivo con `hydrateRoot`.
- **Contenuti tipizzati in locale**: profilo, competenze, esperienze, case study gestionale, progetti, formazione e CV sono separati dai componenti UI e verificati tramite TypeScript.
- **Bilingue e temi**: cambio lingua (`it` / `en`), tema (`light` / `dark`) e riduzione animazioni (`full` / `reduce`) persistenti in `localStorage`, rispettando `prefers-reduced-motion`.
- **Accessibilità e focus**: link *Vai al contenuto*, menu mobile con gestione di `inert`, `aria-hidden` e trap del focus da tastiera, modali su `<dialog>` nativo (`showModal()`), blocco scroll condiviso con conteggio dei riferimenti.
- **Nessuna dipendenza JS da CDN e nessun runtime Tailwind**: stili scritti in CSS modulare (`src/styles/`), bundle locale completo e budget verificato automaticamente a ogni build.
- **Galleria del gestionale con oscuramento dati**: 4 schermate reali censurate nei pixel sia nelle anteprime sia nei file a piena risoluzione, senza originali non censurati nel repository.

## Requisiti e avvio

Requisiti (dichiarati in [`package.json`](package.json)):

- **Node.js** `>= 22.12.0`
- **pnpm** `11.25.0` (gestibile tramite Corepack)

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Altri comandi disponibili:

```sh
pnpm typecheck   # Controllo statico TypeScript (tsc --noEmit)
pnpm test        # Suite Vitest + Testing Library (11 test)
pnpm build       # Typecheck, build client + SSR, prerendering e verifica output
pnpm preview     # Anteprima locale della build in dist/
```

`pnpm build` produce `dist/`, pronta per qualsiasi hosting statico senza server applicativo in produzione. [`index.html`](index.html) funge da template di ingresso per Vite: contiene i metadati SEO/OpenGraph/JSON-LD, i Google Fonts, la favicon SVG inline e il segnaposto `<!--app-html-->` sostituito durante il prerendering.

## Organizzazione del repository

- [`src/App.tsx`](src/App.tsx), [`src/main.tsx`](src/main.tsx), [`src/entry-server.tsx`](src/entry-server.tsx): albero principale React (`LazyMotion` + `PreferencesProvider` + `DetailDialog` caricata in lazy loading), ingresso client (`hydrateRoot` / `createRoot`) e punto di ingresso SSR (`renderToString`).
- [`src/components/sections/`](src/components/sections/): `Hero`, `Skills`, `Experience`, `CaseStudy`, `Projects`, `Education` e `Contact`; più i componenti riutilizzabili `CaseStudyGallery`, `ProjectPreview` e `ArchitectureDiagram`.
- [`src/components/layout/`](src/components/layout/): `Header` (navigazione desktop e drawer mobile) e `Footer` (informativa privacy, controllo animazioni, ritorno in alto).
- [`src/components/ui/`](src/components/ui/): `Card`, `Icon`, `Reveal`, `Screenshot`, `SectionHeading`, `Tags`, `WindowDots`.
- [`src/components/dialogs/`](src/components/dialogs/): `DetailDialog`, caricata su richiesta alla prima apertura di un’immagine ingrandita, di una scheda progetto o dell’informativa privacy.
- [`src/components/effects/`](src/components/effects/): `Loader` (introduzione decorativa GM), `AmbientBackground` (sfere radiali e canvas particellare), `CursorSpotlight` e `SmoothScroll` (Lenis).
- [`src/hooks/`](src/hooks/): `useActiveSection`, `useBodyLock`, `useMediaQuery`, `usePointerTilt`, `useTimeline`.
- [`src/context/`](src/context/): `PreferencesContext` per lingua, tema e movimento (nessuno stato aggiornato ad ogni evento scroll).
- [`src/lib/`](src/lib/): `motionFeatures` (chunk separato `domAnimation` di Framer Motion), `preferences` (`localStorage`) e `scrollActivity` (rilevamento inizio/fine scroll con debounce).
- [`src/content/`](src/content/): dati del portfolio (`index.ts`, `person.ts`, `projects.ts`, `experiences.ts`, `skills.ts`, `education.ts`, `media.ts`, `translations.ts`) e dizionari UI in [`locales/it.ts`](src/content/locales/it.ts) e [`locales/en.ts`](src/content/locales/en.ts).
- [`src/types/content.ts`](src/types/content.ts): definizioni TypeScript condivise (`Project`, `Experience`, `SkillGroup`, `EducationItem`, `ScreenshotMedia`, `DialogContent`, `Locale`, `Localized`, `MediaKey`).
- [`src/assets/`](src/assets/): immagini dei progetti e del gestionale (anteprime WebP e versioni a piena risoluzione), servite con hash da Vite.
- [`src/styles/`](src/styles/): fogli CSS modulari organizzati per area (`index.css`, `base.css`, `effects.css`, `layout.css`, `hero.css`, `cards.css`, `sections.css`, `responsive.css`, `performance.css`, `readability.css`, `gallery.css`, `glass.css`, `mobile-menu.css`).
- [`src/test/`](src/test/): test unitari e di integrazione (`App.test.tsx`, `Effects.test.tsx`, `Loader.test.tsx`, `setup.ts`).
- [`scripts/`](scripts/): `prerender.mjs` (inietta l’HTML renderizzato in `dist/index.html` e rimuove `.prerender/`) e `verify-build.mjs` (controlli automatici sull’output finale).
- [`public/cv/`](public/cv/): copie PDF dei due curriculum (`Giada-Maria-Campolongo-CV-Sviluppo.pdf` e `Giada-Maria-Campolongo-CV-Ufficio.pdf`).
- [`source-assets/`](source-assets/): PNG sorgenti già censurati del gestionale e registro di provenienza [`provenance.json`](source-assets/provenance.json).
- [`docs/content-management.md`](docs/content-management.md): guida ai contenuti locali tipizzati ed esempi per eventuali integrazioni CMS esterne.

## Aggiornare il portfolio

Per aggiornare progetti, esperienze, competenze, formazione, dati personali o screenshot, modifica i rispettivi moduli in [`src/content/`](src/content/). Le stringhe dell’interfaccia sono raccolte in [`src/content/locales/it.ts`](src/content/locales/it.ts) e [`src/content/locales/en.ts`](src/content/locales/en.ts), con controllo dei campi garantito da [`src/types/content.ts`](src/types/content.ts). Ulteriori dettagli sono in [`docs/content-management.md`](docs/content-management.md).

I due curriculum originali in italiano sono pubblicati in [`public/cv/`](public/cv/):

- `public/cv/Giada-Maria-Campolongo-CV-Sviluppo.pdf`
- `public/cv/Giada-Maria-Campolongo-CV-Ufficio.pdf`

I pulsanti nella sezione Contatti avviano il download diretto. Per aggiornarli, sostituisci i PDF mantenendo i nomi oppure aggiorna i percorsi in [`src/content/person.ts`](src/content/person.ts). La build verifica automaticamente presenza, intestazione `%PDF-` e identità dei file pubblicati rispetto a `public/cv/`.

## Scelte tecniche e performance nello scroll

- **Introduzione decorativa non bloccante** ([`Loader.tsx`](src/components/effects/Loader.tsx), [`performance.css`](src/styles/performance.css)): appare una sola volta per sessione (`sessionStorage`), avvia la dissolvenza CSS dopo `1,05 s` (`250 ms`) con timer React di sicurezza a `1,4 s`, non blocca lo scroll (`pointer-events: none`) e si chiude con `Escape`, `visibilitychange` o `pageshow`. È assente dall’HTML prerenderizzato e disabilitata con movimento ridotto.
- **Osservazione senza lettura continua del layout**: nessuna chiamata a `getBoundingClientRect` nei listener di scroll. [`useActiveSection.ts`](src/hooks/useActiveSection.ts) e [`useTimeline.ts`](src/hooks/useTimeline.ts) usano `IntersectionObserver`; [`scrollActivity.ts`](src/lib/scrollActivity.ts) notifica solo inizio e fine scroll (debounce `160 ms`). La barra di avanzamento `#scroll-progress` utilizza `animation-timeline: scroll(root)` nei browser compatibili tramite `@supports`.
- **Sfocatura d’ingresso mirata** ([`Reveal.tsx`](src/components/ui/Reveal.tsx)): animazione locale (`blur(4px)` → `0`) tramite Web Animations API applicata al più a tre elementi testuali (`h2`, `h3`, `.section-intro`, `.project-copy > p`), per `400 ms` su desktop e `460 ms` su viewport/puntatore compatti, attivata una sola volta (`threshold: 0.08`, `rootMargin: '0px 0px -24px 0px'`) e annullata al termine. Disattivata con movimento ridotto. Nessun blur animato su intere sezioni, card complete o immagini.
- **Superfici glass statiche** ([`readability.css`](src/styles/readability.css), [`glass.css`](src/styles/glass.css)): l’header applica un `backdrop-filter` statico di `14px` (`12px` su mobile) al solo pseudo-elemento `#site-header::before` per non interferire con il menu fisso mobile. Le card limitano il blur a `10px` su desktop e `6px` su touch/mobile, con fallback opachi per browser privi di supporto, `prefers-reduced-transparency`, `prefers-contrast`, `forced-colors` e stampa.
- **Framer Motion in chunk separato**: [`Reveal.tsx`](src/components/ui/Reveal.tsx) usa `m.div` animando `opacity` e `transform` (`y`), con feature `domAnimation` caricate dinamicamente via `LazyMotion`.
- **Sfondo particellare e gradienti** ([`AmbientBackground.tsx`](src/components/effects/AmbientBackground.tsx)): `90` particelle su desktop (`45` su dispositivi touch/compatti), limitate a `30 fps` su desktop e `24 fps` su mobile (`20 fps` durante lo scroll), con velocità indipendente dal framerate (`12–22 px/s`) e collegamenti calcolati su un vicinato fisso di 3 particelle (`O(n)`). Tre orb radiali si muovono tramite sole trasformazioni `translate3d`/`scale`. Tutto si sospende quando la scheda è nascosta o con movimento ridotto.
- **Tilt e spotlight solo per puntatore fine** ([`usePointerTilt.ts`](src/hooks/usePointerTilt.ts), [`CursorSpotlight.tsx`](src/components/effects/CursorSpotlight.tsx)): il tilt misura il rettangolo all’ingresso del puntatore mouse e aggiorna le variabili CSS al più una volta per frame; lo spotlight (`600 px` + anello `28 px`) sposta una texture statica via `translate3d` mantenendo il cursore nativo. Entrambi sono disattivati su touch, durante lo scroll (il tilt) e con movimento ridotto.
- **Scroll fluido Lenis** ([`SmoothScroll.tsx`](src/components/effects/SmoothScroll.tsx)): attivo su mouse/trackpad (`wheelMultiplier: 0.75`, `lerp: 0.075`, `syncTouch: false`) lasciando al touch l’inerzia nativa; gestisce i collegamenti ad ancora, si ferma quando la pagina è nascosta o quando menu/modali bloccano il `body`, ed è disabilitato con movimento ridotto.
- **Immagini e font**: [`Screenshot.tsx`](src/components/ui/Screenshot.tsx) dichiara `width` e `height` e usa `loading="lazy"` in pagina (`"eager"` nella modale). Le quattro schermate del gestionale mostrano anteprime WebP leggere nella galleria e caricano le versioni WebP a piena risoluzione all’apertura della modale. I font (`Inter`, `JetBrains Mono`, `Playfair Display`) sono richiesti a Google Fonts con `display=swap`; tutte le dipendenze JavaScript sono compilate nel bundle locale (comportamento descritto anche nella modale Privacy).

## Verifica

La suite automatica copre due livelli:

1. **Test (`pnpm test`)** in [`src/test/`](src/test/):
   - `App.test.tsx` (6 test): accessibilità e gestione focus/scroll del menu mobile, cambio lingua IT/EN e tema chiaro/scuro con persistenza `localStorage`, apertura modali screenshot a piena risoluzione e navigazione di tutte e 4 le slide del gestionale, link ai progetti, link di download dei 2 CV e debounce di `scrollActivity`.
   - `Effects.test.tsx` (2 test): animazione particelle e pausa/ripresa su `visibilitychange`; blocco e ripristino di Lenis con overlay e ancore.
   - `Loader.test.tsx` (3 test): chiusura automatica senza dipendere da `sessionStorage`, chiusura con `Escape` e singola esecuzione per sessione, rispetto di `prefers-reduced-motion`.
2. **Verifica statica post-build (`pnpm build` → [`scripts/verify-build.mjs`](scripts/verify-build.mjs))**:
   - Assenza di `#intro-overlay` nell’HTML prerenderizzato.
   - Presenza delle 6 sezioni principali (`profilo`, `competenze`, `esperienza`, `case-study`, `progetti`, `contatti`).
   - Esistenza di tutti gli asset `/assets/*` referenziati in `dist/index.html` e assenza di immagini inline base64 o vecchi script CDN (`esm.sh`, `tailwindcss/browser`, `api.github`).
   - Presenza e integrità dei due PDF in `dist/cv/` rispetto a `public/cv/`.
   - Budget di peso: HTML `< 100 kB` e totale chunk JS `< 160 kB` gzip.

I test girano in ambiente `jsdom` e non misurano gli FPS effettivi: per valutare la fluidità grafica resta necessaria una verifica su browser e dispositivo reale.

## Pubblicazione

`pnpm build` genera l’intero sito statico nella directory `dist/`, compatibile con qualsiasi hosting statico (es. Netlify con build command `pnpm build` e publish directory `dist`, Vercel o Cloudflare Pages). Non sono richieste variabili d’ambiente, database o credenziali lato server; la configurazione Vite usa il base path di default `/`.

## Galleria del gestionale

La sezione Case Study integra [`CaseStudyGallery.tsx`](src/components/sections/CaseStudyGallery.tsx) con quattro schermate reali del gestionale sviluppato per Algeco Power. La navigazione supporta frecce, indicatori, tasti direzionali (`ArrowLeft`/`ArrowRight`) e swipe nativo con CSS scroll snap, senza autoplay né loop JavaScript. Ogni slide usa un’anteprima WebP compressa nel carosello e apre nella modale la corrispondente immagine WebP a piena risoluzione:

1. **Panoramica delle zone e degli appuntamenti** (`algeco`): vista d’insieme della mappa e degli appuntamenti, con comuni e identificativi oscurati nella sidebar.
2. **Pianificazione degli interventi** (`algecoDetail`): dettaglio operativo sulla mappa, con nominativi, comuni e identificativi oscurati nella sidebar.
3. **Gestione dei contatti e degli appuntamenti** (`algecoRecords`): schede anagrafiche e appuntamenti con nomi, indirizzi, comuni, telefoni, codici POD, note, date e orari coperti da barre opache.
4. **Calendario delle attività** (`algecoCalendar`): vista calendario con dati personali, codici POD ed ENELTEL, operatori, account, date, orari e note oscurati.

Tutti gli oscuramenti sono applicati direttamente nei pixel dei file in [`source-assets/`](source-assets/) da cui derivano le versioni in [`src/assets/`](src/assets/); nessun originale non censurato è incluso nel repository.
