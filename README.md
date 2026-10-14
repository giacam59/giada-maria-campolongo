# Giada Maria Campolongo — Portfolio

Progetto React 18 + TypeScript + Vite. Un solo albero React, componenti reali,
contenuti tipizzati e stili separati. Italiano e inglese, tema chiaro/scuro,
preferenze di movimento, schermate reali ingrandibili e layout responsive.

## Avvio

Requisiti: Node.js 22.12 o successivo e pnpm 11.25.0.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

`pnpm build` genera `dist/`, pronta per hosting statico. La build prerenderizza
le sezioni con React: il testo è già nell’HTML prima del caricamento JavaScript.
Il browser lo rende interattivo con `hydrateRoot`. Nessun server applicativo è
necessario in produzione. `index.html` è solo il punto di ingresso di Vite.

## Organizzazione

- `src/components/sections/`: Hero, Skills, Experience, CaseStudy, Projects,
  Education e Contact; CaseStudyGallery e ProjectPreview e ArchitectureDiagram sono riutilizzabili.
- `src/components/layout/`: Header e Footer.
- `src/components/ui/`: icone, card, tag, screenshot e animazioni di ingresso.
- `src/components/dialogs/`: modale caricata solo alla prima apertura.
- `src/components/effects/`: introduzione GM, sfondo decorativo, spotlight e scroll morbido.
- `src/hooks/`: preferenze media, blocco scroll, navigazione, timeline e tilt.
- `src/context/`: preferenze condivise, senza stato aggiornato ad ogni scroll.
- `src/content/`: dati del portfolio e traduzioni IT/EN.
- `src/assets/`: immagini reali, servite con nomi versionati da Vite.
- `src/styles/`: CSS organizzato per area; `performance.css` raccoglie le
  regole che limitano il lavoro grafico durante lo scroll.
- `src/test/`: test delle interazioni e della gestione degli eventi scroll.
- `source-assets/`: schermate censurate e provenienza delle immagini.

## Aggiornare il portfolio

Modifica progetti, esperienze, competenze e formazione nei rispettivi file in
`src/content/`. Le stringhe dell’interfaccia sono in `src/content/locales/it.ts`
e `en.ts`. I tipi in `src/types/content.ts` aiutano a trovare campi mancanti.

I due curriculum originali in italiano sono pubblicati in `public/cv/`:
`Giada-Maria-Campolongo-CV-Sviluppo.pdf` e
`Giada-Maria-Campolongo-CV-Ufficio.pdf`. I pulsanti in Contatti avviano il download.
Per aggiornarli, sostituisci i PDF mantenendo i nomi oppure modifica i percorsi in
`src/content/person.ts`. La build verifica presenza, formato e integrità delle
copie pubblicate. Il profilo resta unico, con due CV disponibili.

## Scelte per lo scroll

I contenuti sono prerenderizzati e non attendono l’introduzione GM. L’introduzione
appare una volta per sessione, con dissolvenza CSS indipendente dopo 1,05 secondi,
timer React di sicurezza a 1,4 secondi. Mostra solo GM e la linea animata,
senza pulsanti o link. Non blocca lo scroll
e si chiude anche con Escape o quando la pagina viene nascosta. È assente dall’HTML
statico e viene disattivata con movimento ridotto.

- Nessun `getBoundingClientRect` nel listener scroll; navigazione e timeline
  usano IntersectionObserver. La barra di progresso usa CSS scroll timelines
  nei browser compatibili e viene omessa negli altri.
- Sfocatura d’ingresso soltanto su titoli e brevi introduzioni: 4px per 400ms
  su desktop, 4px per 460ms su touch/mobile. Parte quando almeno l’8% del blocco
  entra nella zona visibile, con un margine inferiore di 24px. Si esegue una sola volta tramite
  Web Animations API e si rimuove al termine; è disattivata con movimento ridotto.
  Nessun blur animato sull’intera sezione, sulle immagini o sulle card complete.
  L’header usa un backdrop-filter statico di 14px (12px su mobile), limitato
  a uno pseudo-elemento alto quanto la barra: non influenza il menu fisso.
- Le card usano fondi traslucidi, riflessi statici e bordi luminosi in
  `src/styles/glass.css`. Il backdrop blur è limitato alla superficie delle
  card: 10px desktop, 6px touch/mobile, senza filtri annidati o nuovi listener.
  Testi e immagini restano nitidi. Fallback opaco senza supporto backdrop,
  con trasparenza ridotta, contrasto maggiore, colori forzati e stampa.
- Le animazioni di ingresso si eseguono una volta, usando opacity e transform.
  Le funzionalità Framer Motion sono caricate in un chunk separato.
- Particelle a 24 fps su touch/mobile (20 durante lo scroll) e 30 fps su desktop.
  Movimento di 12–22 px/s indipendente dagli FPS, attivo lungo tutta la pagina;
  sospeso solo quando nascosta o con movimento ridotto.
  Tre gradienti si muovono lentamente sullo sfondo anche su mobile, usando
  solo trasformazioni e senza filtri blur; si fermano quando la pagina non è
  visibile, rispettando le preferenze di movimento.
- Collegamenti delle particelle in O(n), invece del precedente confronto O(n²).
- Tilt limitato al mouse: una misura all’ingresso e un aggiornamento per frame.
- Spotlight da 600px e anello sul mouse: texture radiale statica spostata via
  transform, al massimo un aggiornamento per frame, senza filtri. Cursore nativo
  mantenuto; effetto assente su touch e con movimento ridotto.
- Lenis ammorbidisce mouse/trackpad con `wheelMultiplier: 0.75` e `lerp: 0.075`.
  Scroll del documento reale; touch con inerzia nativa. Le ancore restano attive,
  menu/modali fermano lo scroll della pagina. Disabilitato con movimento ridotto.
- Screenshot lazy, cacheabili e con dimensioni dichiarate. La mappa usa
  un’anteprima leggera; l’originale lossless si carica aprendo la modale.
- Nessun runtime Tailwind nel browser e nessuna dipendenza JavaScript da CDN.

I font sono richiesti a Google Fonts con `display=swap`. Le altre dipendenze
sono compilate localmente. L’informativa descrive questi comportamenti.

## Verifica

La build controlla TypeScript, le sezioni prerenderizzate, l’esistenza degli
asset, l’assenza delle vecchie dipendenze CDN e un budget HTML/JavaScript.
I test controllano lingua, tema, modali, link, CV e il ciclo degli eventi scroll.
Questi controlli non misurano gli FPS: una verifica su dispositivo reale resta
necessaria per valutare la fluidità specifica del browser e dell’hardware.

## Pubblicazione

Pubblica la cartella `dist/` su un hosting statico. Per Netlify: comando
`pnpm build`, directory `dist`. `.openai/hosting.json` conserva l’identità della
pubblicazione Sites esistente. Nessuna credenziale è inclusa nel progetto.

## Galleria del gestionale

Quattro schermate, navigazione tramite frecce, indicatori, tasti direzionali e swipe
nativo con scroll snap. Nessun autoplay o loop JavaScript. Ogni schermata apre
la propria immagine a piena risoluzione. La seconda include oscuramenti opachi
di nomi, comuni e identificativi nella sidebar, incorporati nei pixel sia
dell’anteprima sia dell’immagine ingrandita. Il nuovo originale non censurato
non viene copiato nel progetto. La prima schermata è stata sostituita con la nuova panoramica del 9 ottobre,
con comuni e codici della sidebar oscurati anche nel file ingrandibile.

La terza schermata mostra le schede contatti: nomi, indirizzi, comuni, telefoni,
POD, note e dati degli appuntamenti sono coperti da barre opache sia
nell’anteprima sia nell’immagine ingrandita. L’originale non censurato non è
incluso nel progetto.

La quarta schermata mostra il calendario attività con dati personali, POD,
ENELTEL, operatori, date, orari e note oscurati in entrambe le risoluzioni.
