import portfolio from '../assets/portfolio.jpg';
import artist from '../assets/micromihai.jpg';
import concept from '../assets/algeco-website.webp';
import algeco from '../assets/algeco-gestionale.webp';
import algecoThumbnail from '../assets/algeco-gestionale-preview.webp';
import algecoDetail from '../assets/algeco-interventi-censurato.webp';
import algecoDetailThumbnail from '../assets/algeco-interventi-censurato-preview.webp';
import algecoRecords from '../assets/algeco-contatti-censurato.webp';
import algecoRecordsThumbnail from '../assets/algeco-contatti-censurato-preview.webp';
import algecoCalendar from '../assets/algeco-calendario-censurato.webp';
import algecoCalendarThumbnail from '../assets/algeco-calendario-censurato-preview.webp';
import type { MediaKey, ScreenshotMedia } from '../types/content';

export const media: Record<MediaKey, ScreenshotMedia> = {
  algecoCalendar: {
    src: algecoCalendar,
    thumbnail: algecoCalendarThumbnail,
    width: 1742,
    height: 903,
    label: { it: 'Calendario delle attività', en: 'Activity calendar' },
    alt: {
      it: 'Calendario del gestionale Algeco Power con nominativi, contatti, indirizzi, comuni, POD, ENELTEL, operatori, date, orari e note oscurati.',
      en: 'Algeco Power activity calendar with names, contact details, addresses, municipalities, POD and ENELTEL codes, operators, dates, times and notes redacted.',
    },
  },
  algecoRecords: {
    src: algecoRecords,
    thumbnail: algecoRecordsThumbnail,
    width: 1742,
    height: 903,
    label: { it: 'Gestione dei contatti e degli appuntamenti', en: 'Contact and appointment management' },
    alt: {
      it: 'Gestionale Algeco Power: schede dei contatti e degli appuntamenti con nomi, indirizzi, telefoni, POD, note, date e orari oscurati.',
      en: 'Algeco Power management system: contact and appointment cards with names, addresses, phone numbers, POD codes, notes, dates and times redacted.',
    },
  },
  algecoDetail: {
    src: algecoDetail,
    thumbnail: algecoDetailThumbnail,
    width: 1746,
    height: 901,
    label: { it: 'Pianificazione degli interventi', en: 'Technical visit scheduling' },
    alt: {
      it: 'Gestionale Algeco Power: dettaglio degli interventi sulla mappa, con nomi, comuni e identificativi oscurati nella sidebar.',
      en: 'Algeco Power management system: detailed visit map with names, municipalities and identifiers redacted in the sidebar.',
    },
  },
  "portfolio": {
    "src": portfolio,
    "width": 1348,
    "height": 926,
    "label": {
      "it": "Portfolio personale",
      "en": "Personal portfolio"
    },
    "alt": {
      "it": "Homepage attuale del portfolio di Giada Maria Campolongo, con presentazione e scheda profilo GM.",
      "en": "Current homepage of Giada Maria Campolongo’s portfolio, with introduction and GM profile card."
    }
  },
  "artist": {
    "src": artist,
    "width": 1348,
    "height": 926,
    "label": {
      "it": "Micromihai",
      "en": "Micromihai"
    },
    "alt": {
      "it": "Homepage del sito Micromihai con logo, fotografia dell’artista e collegamenti alla musica.",
      "en": "Micromihai website homepage with logo, artist photograph and music links."
    }
  },
  "concept": {
    "src": concept,
    "width": 1280,
    "height": 720,
    "label": {
      "it": "Prototipo sito Algeco Power",
      "en": "Algeco Power website prototype"
    },
    "alt": {
      "it": "Schermata reale del prototipo Algeco Power: navigazione e presentazione degli impianti fotovoltaici.",
      "en": "Actual screenshot of the Algeco Power prototype: navigation and introduction to solar installations."
    }
  },
  "algeco": {
    "src": algeco,
    "width": 1740,
    "height": 904,
    "label": {
      "it": "Gestionale Algeco Power",
      "en": "Algeco Power management system"
    },
    "alt": {
      "it": "Gestionale Algeco Power: panoramica della mappa e degli appuntamenti, con comuni e codici della sidebar oscurati.",
      "en": "Algeco Power management system: map and appointment overview, with municipalities and identifiers redacted in the sidebar."
    },
    "thumbnail": algecoThumbnail
  }
};
