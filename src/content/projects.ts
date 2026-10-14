import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    "id": "portfolio",
    "number": "01",
    "kind": "portfolio",
    "title": {
      "it": "Portfolio Personale",
      "en": "Personal Portfolio"
    },
    "category": {
      "it": "Portfolio personale",
      "en": "Personal portfolio"
    },
    "summary": {
      "it": "Ho realizzato questo sito con React e TypeScript per raccogliere il mio percorso, i progetti e i curriculum. Ho curato la struttura dei componenti, il layout responsive e le animazioni.",
      "en": "I built this website with React and TypeScript to bring together my experience, projects and CVs. I worked on the component structure, responsive layout and animations."
    },
    "stack": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS"
    ],
    "details": {
      "it": [
        "Componenti organizzati in un’architettura modulare.",
        "Interfaccia responsive e animazioni con effetto 3D parallax.",
        "Sezioni dedicate a esperienze, competenze, progetti e curriculum."
      ],
      "en": [
        "Components organised in a modular architecture.",
        "Responsive interface and animations with a 3D parallax effect.",
        "Sections for experience, skills, projects and CVs."
      ]
    },
    "imageKey": "portfolio",
    "url": "https://giada-maria-campolongo-portfolio.giacam2005.chatgpt.site/"
  },
  {
    "id": "artist",
    "number": "02",
    "kind": "artist",
    "title": {
      "it": "Sito web Micromihai",
      "en": "Micromihai website"
    },
    "category": {
      "it": "Sito per un artista musicale",
      "en": "Music artist website"
    },
    "summary": {
      "it": "Un sito multilingua per presentare l’artista, la sua musica e i canali di ascolto. Ho sviluppato le pagine e il form di contatto, con notifiche Telegram tramite Netlify Functions.",
      "en": "A multilingual website presenting the artist, his music and listening platforms. I developed the pages and contact form, with Telegram notifications through Netlify Functions."
    },
    "stack": [
      "React 18",
      "TypeScript",
      "i18next",
      "Netlify Functions"
    ],
    "details": {
      "it": [
        "SPA multilingua con i18next e navigazione tramite routing.",
        "Animazioni e attenzione alla SEO.",
        "Form validato con notifiche Telegram tramite Netlify Functions."
      ],
      "en": [
        "Multilingual SPA with i18next and client-side routing.",
        "Animations and attention to SEO.",
        "Validated form with Telegram notifications through Netlify Functions."
      ]
    },
    "imageKey": "artist",
    "url": "https://micromihai.com/en"
  },
  {
    "id": "concept",
    "number": "03",
    "kind": "concept",
    "title": {
      "it": "Prototipo sito Algeco Power",
      "en": "Algeco Power website prototype"
    },
    "category": {
      "it": "Prototipo aziendale",
      "en": "Business website prototype"
    },
    "summary": {
      "it": "Un prototipo del sito aziendale realizzato con React e TypeScript. Ho lavorato sull’organizzazione dei servizi, sulla navigazione e sull’adattamento delle pagine a schermi diversi.",
      "en": "A company website prototype built with React and TypeScript. I worked on the organisation of services, navigation and layouts for different screen sizes."
    },
    "stack": [
      "React 18",
      "TypeScript",
      "Vite",
      "Glassmorphism"
    ],
    "details": {
      "it": [
        "Prototipo di portale aziendale sviluppato con React e TypeScript.",
        "Design glassmorfico, layout responsive e animazioni.",
        "Validazione del form integrata nell’interfaccia."
      ],
      "en": [
        "A business portal prototype built with React and TypeScript.",
        "Glassmorphic design, responsive layouts and animations.",
        "Form validation integrated into the interface."
      ]
    },
    "imageKey": "concept",
    "url": "https://algecopower.netlify.app/"
  }
];
