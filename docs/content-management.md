# Gestione dei contenuti e possibili integrazioni CMS

Il portfolio utilizza attualmente un **CMS locale tipizzato**: tutti i dati sono raccolti ed esportati da [`src/content/index.ts`](../src/content/index.ts) e validati dalle interfacce in [`src/types/content.ts`](../src/types/content.ts). Non è necessario alcun servizio esterno per aggiornare i contenuti o compilare il sito.

## Struttura dei file di contenuto

- `src/content/person.ts`: dati anagrafici di contatto (`person`) e percorsi ai PDF pubblicati in `public/cv/` (`cv`).
- `src/content/projects.ts`: elenco dei progetti (`Project[]`), collegati alle immagini tramite `imageKey` (`MediaKey`).
- `src/content/experiences.ts`: esperienze lavorative (`Experience[]`).
- `src/content/skills.ts`: gruppi di competenze (`SkillGroup[]`).
- `src/content/education.ts`: percorso di studi (`EducationItem[]`).
- `src/content/media.ts`: metadati, dimensioni dichiarate, testi alternativi e anteprime delle schermate (`Record<MediaKey, ScreenshotMedia>`).
- `src/content/locales/it.ts`, `en.ts` e `translations.ts`: testi dell’interfaccia bilingue IT/EN (`Dictionary`).

## Esempio di adattamento a CMS remoto (non attivo)

### Sanity

Un eventuale schema Sanity per i progetti può seguire una struttura simile (esempio da inserire in Sanity Studio, non eseguito nel portfolio):

```ts
export const projectSchema = {
  name: 'project',
  type: 'document',
  title: 'Progetto',
  fields: [
    { name: 'id', type: 'string', title: 'ID' },
    { name: 'number', type: 'string', title: 'Numero' },
    { name: 'kind', type: 'string', title: 'Variante visuale' },
    { name: 'titleIt', type: 'string', title: 'Titolo italiano' },
    { name: 'titleEn', type: 'string', title: 'Titolo inglese' },
    { name: 'categoryIt', type: 'string', title: 'Categoria italiana' },
    { name: 'categoryEn', type: 'string', title: 'Categoria inglese' },
    { name: 'summaryIt', type: 'text', title: 'Descrizione italiana' },
    { name: 'summaryEn', type: 'text', title: 'Descrizione inglese' },
    { name: 'url', type: 'url', title: 'Sito' },
    { name: 'stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'detailsIt', type: 'array', of: [{ type: 'string' }], title: 'Dettagli IT' },
    { name: 'detailsEn', type: 'array', of: [{ type: 'string' }], title: 'Dettagli EN' },
    { name: 'screenshot', type: 'image', title: 'Schermata reale' },
    { name: 'order', type: 'number', title: 'Ordine' },
  ],
};
```

Un adattatore eseguito prima della build dovrà mappare ogni documento nei tipi `Project` e `ScreenshotMedia` (mantenendo `imageKey`, `width`, `height`, `label` e `alt` localizzati). Schemi analoghi possono modellare `Experience`, `SkillGroup` ed `EducationItem`.

### Notion

Per utilizzare Notion come sorgente dati:

1. Esegui il recupero dei dati in uno script Node prima di `vite build` oppure tramite funzione server.
2. Mantieni il token in una variabile d’ambiente server (`NOTION_TOKEN`), **mai** in `VITE_*`, nel bundle client o in `localStorage`.
3. Condividi con l’integrazione solo il database dei contenuti necessario.
4. Valida la risposta e genera moduli conformi ai tipi in `src/types/content.ts`, così da lasciare invariati i componenti UI.

Nessuna integrazione Sanity o Notion è attiva in questa versione e non è richiesto alcun token. Dopo qualsiasi modifica ai contenuti occorre rieseguire `pnpm build` per rigenerare l’HTML prerenderizzato in `dist/`.
