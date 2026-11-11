import type { Experience } from '../types/content';

export const experiences: Experience[] = [
  {
    "id": "algeco",
    "number": "01",
    "title": {
      "it": "Segretaria d'Ufficio & Supporto Amministrativo",
      "en": "Office Secretary & Administrative Support"
    },
    "company": "Algeco Power",
    "place": {
      "it": "Volpiano (TO)",
      "en": "Volpiano (TO)"
    },
    "date": {
      "it": "Nov 2025 - Nov 2026",
      "en": "Nov 2025 - Nov 2026"
    },
    "current": false,
    "description": {
      "it": "Ho gestito appuntamenti, documenti, contatti e supporto operativo con Excel e CRM E-Distribuzione. Ho progettato e sviluppato un gestionale in Python e Flask con database locale per pianificare gli interventi tecnici: importa periodicamente i dati aggiornati da Google Sheets, permette di scaricare le modifiche locali da reimportare su Sheets, legge i PDF con pdfplumber e visualizza zone e percorsi con Jinja2, Leaflet, DBSCAN e OSRM in Docker. Ho seguito anche la pubblicazione su VPS Ubuntu tramite Cloudflare Tunnel, l’autenticazione utenti, i backup automatici e la generazione di messaggi WhatsApp.",
      "en": "I handled appointments, documents, contacts and operational support using Excel and the E-Distribuzione CRM. I designed and developed a Python and Flask management system with a local database for scheduling technical visits: it automatically imports updated Google Sheets files on a schedule, lets users download local database changes to import back into Sheets, reads PDFs with pdfplumber and displays areas and routes using Jinja2, Leaflet, DBSCAN and OSRM in Docker. I also handled deployment on an Ubuntu VPS through Cloudflare Tunnel, user authentication, automatic backups and WhatsApp message generation."
    },
    "tags": [
      "Python / Flask",
      "Automazione",
      "Google Sheets"
    ]
  },
  {
    "id": "selekta",
    "number": "02",
    "title": {
      "it": "Addetta Back-Office Commerciale",
      "en": "Commercial Back-Office Assistant"
    },
    "company": "Selekta",
    "place": {
      "it": "Napoli",
      "en": "Naples"
    },
    "date": {
      "it": "Giu-Ott 2025",
      "en": "Jun–Oct 2025"
    },
    "current": false,
    "description": {
      "it": "Ho gestito chiamate inbound e outbound, pratiche contrattuali e aggiornamenti nel CRM, lavorando con un volume elevato di contatti.",
      "en": "I handled inbound and outbound calls, contract administration and CRM updates, working with a high volume of contacts."
    },
    "tags": [
      "CRM",
      "Reporting",
      "Customer care"
    ]
  },
  {
    "id": "outlier",
    "number": "03",
    "title": {
      "it": "Data Annotator AI",
      "en": "AI Data Annotator"
    },
    "company": "Outlier",
    "place": {
      "it": "Remoto",
      "en": "Remote"
    },
    "date": {
      "it": "2026-In corso",
      "en": "2026–Present"
    },
    "current": true,
    "description": {
      "it": "Mi occupo di annotazione e revisione di testi, codice e ragionamento logico per l’addestramento di modelli di intelligenza artificiale generativa.",
      "en": "I annotate and review text, code and logical reasoning for training generative AI models."
    },
    "tags": [
      "AI",
      "Data annotation",
      "Code"
    ]
  },
  {
    "id": "elections",
    "number": "04",
    "title": {
      "it": "Scrutatrice Seggio",
      "en": "Polling Station Officer"
    },
    "company": "Europee Napoli",
    "place": {
      "it": "Napoli",
      "en": "Naples"
    },
    "date": {
      "it": "Giu 2024",
      "en": "Jun 2024"
    },
    "current": false,
    "description": {
      "it": "Ho partecipato alle operazioni del seggio in occasione delle elezioni europee.",
      "en": "I supported polling station operations during the European elections."
    },
    "tags": []
  }
];
