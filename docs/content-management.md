# Contenuti e possibile CMS remoto

Il CMS attuale è locale e tipizzato: `src/content/index.ts` raccoglie i dati.
Non servono servizi esterni per aggiornare i contenuti o pubblicare il sito.

Per Sanity, un documento progetto può seguire questo schema (esempio da
inserire nello Studio, non eseguito nel portfolio):

```ts
export const projectSchema = {
  name: 'project', type: 'document', title: 'Progetto',
  fields: [
    { name: 'id', type: 'string', title: 'ID' },
    { name: 'titleIt', type: 'string', title: 'Titolo italiano' },
    { name: 'titleEn', type: 'string', title: 'Titolo inglese' },
    { name: 'summaryIt', type: 'text', title: 'Descrizione italiana' },
    { name: 'summaryEn', type: 'text', title: 'Descrizione inglese' },
    { name: 'url', type: 'url', title: 'Sito' },
    { name: 'stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'screenshot', type: 'image', title: 'Schermata reale' },
    { name: 'order', type: 'number', title: 'Ordine' },
  ],
};
```

Un adattatore in fase di build deve trasformare i documenti nel tipo `Project`
e mantenere categoria, dettagli, testo alternativo e traduzioni del modello.
Gli schemi Experience e SkillGroup possono seguire i tipi già presenti.

Per Notion, esegui il recupero dati in uno script Node prima della build oppure
in una funzione server. Mantieni il token in una variabile d’ambiente server
(`NOTION_TOKEN`), mai in `VITE_*`, nel bundle o in localStorage. Condividi con
l’integrazione soltanto il database dei contenuti. Convalida la risposta e
genera moduli conformi ai tipi locali; i componenti restano invariati.

Nessuna integrazione Sanity/Notion è attiva e nessun token è necessario per
questa versione. L’HTML prerenderizzato va rigenerato dopo ogni aggiornamento.
