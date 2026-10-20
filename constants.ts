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
  equipment: string[];
  software: string[];
  hasCarApproval: boolean;
  wantsCompanyCar: boolean;
  coffeeTalkInterest: boolean;
  coffeeTalkTopics: string[];
  travelMode: string;
  needsAccommodation: boolean;
}

export const INITIAL_PROGRESS: PreboardingProgress = {
  activeStage: 'getting-ready',
  completedStages: [],
  equipment: [],
  software: [],
  hasCarApproval: false,
  wantsCompanyCar: false,
  coffeeTalkInterest: false,
  coffeeTalkTopics: [],
  travelMode: '',
  needsAccommodation: false,
};

export const EQUIPMENT_OPTIONS = [
  { id: 'monitor', label: 'Zusätzlicher Monitor' },
  { id: 'keyboard-mouse', label: 'Tastatur und Maus' },
  { id: 'headset', label: 'Headset' },
  { id: 'mobile', label: 'Diensthandy' },
  { id: 'bahncard', label: 'BahnCard' },
] as const;

export const SOFTWARE_OPTIONS = [
  { id: 'office', label: 'Office- und Kommunikationstools' },
  { id: 'secure-access', label: 'VPN / sicherer Zugriff' },
  { id: 'role-specific', label: 'Fachspezifische Software' },
  { id: 'accessibility', label: 'Barrierefreiheits- oder Assistenzsoftware' },
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
