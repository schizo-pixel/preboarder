export const STORAGE_KEY = 'all-for-one-preboarding-progress-v1';

export const PREBOARDING_STAGES = [
  {
    id: 'getting-ready',
    timing: 'Mit längerem Vorlauf',
    title: 'Ausstattung vorbereiten',
    description: 'Plane Hardware, Mobilgerät und Software rechtzeitig, damit zum Start alles bereitsteht.',
  },
  {
    id: 'getting-connected',
    timing: 'Einige Wochen vorher',
    title: 'Menschen kennenlernen',
    description: 'Lerne künftige Kolleg:innen kennen und plane einen lockeren Coffee Talk.',
  },
  {
    id: 'welcome-days',
    timing: 'Kurz vor deinem Start',
    title: 'Welcome Days planen',
    description: 'Kläre Anreise und Unterkunft, wenn die Termine näher rücken.',
  },
] as const;

export type PreboardingStageId = (typeof PREBOARDING_STAGES)[number]['id'];

export interface PreboardingProgress {
  activeStage: PreboardingStageId;
  completedStages: PreboardingStageId[];
  monitor: string;
  phone: string;
  headset: string;
  accessories: string[];
  bahncard: string;
  software: string[];
  coffeeTalkInterest: boolean;
  coffeeTalkTopics: string[];
  travelMode: string;
  needsAccommodation: boolean;
}

export const INITIAL_PROGRESS: PreboardingProgress = {
  activeStage: 'getting-ready',
  completedStages: [],
  monitor: '',
  phone: '',
  headset: '',
  accessories: [],
  bahncard: '',
  software: [],
  coffeeTalkInterest: false,
  coffeeTalkTopics: [],
  travelMode: '',
  needsAccommodation: false,
};

export const MONITOR_OPTIONS = [
  { id: '', label: 'Noch keine Auswahl' },
  { id: 'monitor-27-4k', label: '27 Zoll · 4K UHD' },
  { id: 'monitor-32-4k', label: '32 Zoll · 4K UHD' },
  { id: 'monitor-34-ultrawide', label: '34 Zoll · UltraWide' },
  { id: 'monitor-standard', label: 'Standardmonitor · Modell nach IT-Katalog' },
] as const;

export const PHONE_OPTIONS = [
  { id: '', label: 'Noch keine Auswahl' },
  { id: 'iphone-17', label: 'Apple iPhone 17' },
  { id: 'samsung-s25-ee', label: 'Samsung Galaxy S25 Enterprise Edition' },
] as const;

export const HEADSET_OPTIONS = [
  { id: '', label: 'Noch keine Auswahl' },
  { id: 'bluetooth', label: 'Bluetooth · kabellos' },
  { id: 'usb-c', label: 'Kabelgebunden · USB-C' },
  { id: 'usb-a', label: 'Kabelgebunden · USB-A' },
] as const;

export const ACCESSORY_OPTIONS = [
  { id: 'docking-station', label: 'Dockingstation' },
  { id: 'keyboard', label: 'Tastatur' },
  { id: 'mouse', label: 'Maus' },
  { id: 'webcam', label: 'Externe Webcam' },
] as const;

export const BAHNCARD_OPTIONS = [
  { id: '', label: 'Noch keine Auswahl' },
  { id: 'bahncard-25', label: 'BahnCard 25' },
  { id: 'bahncard-50', label: 'BahnCard 50' },
  { id: 'bahncard-100', label: 'BahnCard 100' },
] as const;

export const SOFTWARE_OPTIONS = [
  { id: 'microsoft-365', label: 'Microsoft 365 Apps' },
  { id: 'microsoft-teams', label: 'Microsoft Teams' },
  { id: 'microsoft-outlook', label: 'Microsoft Outlook' },
  { id: 'microsoft-onedrive', label: 'Microsoft OneDrive' },
  { id: 'sap-gui', label: 'SAP GUI · rollenabhängig' },
  { id: 'visual-studio-code', label: 'Visual Studio Code · rollenabhängig' },
  { id: 'adobe-acrobat-reader', label: 'Adobe Acrobat Reader' },
  { id: 'vpn-client', label: 'VPN-Client · Produkt durch IT festzulegen' },
] as const;

export const COFFEE_TALK_TOPICS = [
  { id: 'team', label: 'Team und Zusammenarbeit' },
  { id: 'role', label: 'Aufgaben und Rolle' },
  { id: 'culture', label: 'Kultur und Arbeitsalltag' },
] as const;

export const TRAVEL_OPTIONS = [
  { id: 'train', label: 'Bahn' },
  { id: 'car', label: 'Auto' },
  { id: 'public-transport', label: 'ÖPNV' },
  { id: 'other', label: 'Noch offen / andere Anreise' },
] as const;
