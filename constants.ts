import type { PreboardingOption, PreboardingTask, QuickAction } from './types';

export const PREBOARDING_TASKS: PreboardingTask[] = [
  {
    id: 'first-day',
    title: 'Details zum ersten Tag prüfen',
    description: 'Uhrzeit, Treffpunkt und Ansprechperson stehen in deiner Einladung oder den Unterlagen von P&O.',
    category: 'Organisation',
  },
  {
    id: 'documents',
    title: 'P&O-Unterlagen sicher erledigen',
    description: 'Nutze ausschließlich den offiziellen People-&-Organization-Kanal aus deiner Einladung.',
    category: 'P&O',
  },
  {
    id: 'equipment',
    title: 'Ausstattung und Software vormerken',
    description: 'Wähle deinen Bedarf in der Demo vor. Verbindlich wird die Auswahl erst über den freigegebenen Self-Service.',
    category: 'Self-Service',
  },
  {
    id: 'welcome-days',
    title: 'Welcome Days planen',
    description: 'Prüfe die Einladung und plane Anreise sowie eine mögliche Unterkunft.',
    category: 'Organisation',
  },
  {
    id: 'team',
    title: 'Coffee Talk vormerken',
    description: 'Bekunde Interesse an einem lockeren Kennenlernen mit künftigen Kolleg:innen.',
    category: 'Menschen',
  },
  {
    id: 'questions',
    title: 'Offene Fragen an P&O sammeln',
    description: 'Für persönliche oder vertrauliche Themen nutze den offiziellen P&O-Kontakt aus deiner Einladung.',
    category: 'Self-Service',
  },
];

export const EQUIPMENT_OPTIONS: PreboardingOption[] = [
  { id: 'monitor', label: 'Zusätzlicher Monitor' },
  { id: 'keyboard-mouse', label: 'Tastatur und Maus' },
  { id: 'headset', label: 'Headset' },
  { id: 'mobile', label: 'Diensthandy' },
  { id: 'bahncard', label: 'BahnCard' },
];

export const SOFTWARE_OPTIONS: PreboardingOption[] = [
  { id: 'office', label: 'Office- und Kommunikationstools' },
  { id: 'secure-access', label: 'VPN / sicherer Zugriff' },
  { id: 'role-specific', label: 'Fachspezifische Software' },
  { id: 'accessibility', label: 'Barrierefreiheits- oder Assistenzsoftware' },
];

export const COFFEE_TALK_TOPICS: PreboardingOption[] = [
  { id: 'team', label: 'Team und Zusammenarbeit' },
  { id: 'role', label: 'Aufgaben und Rolle' },
  { id: 'culture', label: 'Kultur und Arbeitsalltag' },
];

export const TRAVEL_OPTIONS: PreboardingOption[] = [
  { id: 'train', label: 'Bahn' },
  { id: 'car', label: 'Auto' },
  { id: 'public-transport', label: 'ÖPNV' },
  { id: 'other', label: 'Noch offen / andere Anreise' },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Was kann ich vor Tag 1 erledigen?',
    prompt: 'Was kann ich vor meinem ersten Arbeitstag erledigen?',
  },
  {
    label: 'Wie erreiche ich P&O?',
    prompt: 'Wie erreiche ich P&O?',
  },
  {
    label: 'Frage zu Ausstattung oder Software',
    prompt: 'Wie kann ich Ausstattung oder Software auswählen?',
  },
  {
    label: 'Frage zu Welcome Days',
    prompt: 'Was sollte ich für die Welcome Days planen?',
  },
];

export const getPreboardingAnswer = (question: string): string => {
  const normalizedQuestion = question.toLocaleLowerCase('de');

  if (
    normalizedQuestion.includes('allerg') ||
    normalizedQuestion.includes('unverträglich') ||
    normalizedQuestion.includes('gesundheit') ||
    normalizedQuestion.includes('persönlich') ||
    normalizedQuestion.includes('vertraulich')
  ) {
    return 'Gesundheitsangaben wie Allergien sowie persönliche oder vertrauliche Anliegen bitte nicht hier eingeben. Wende dich dafür direkt über den sicheren, offiziellen Kontakt aus deiner Einladung an People & Organization (P&O).';
  }

  if (
    normalizedQuestion.includes('laptop') ||
    normalizedQuestion.includes('zugang') ||
    normalizedQuestion.includes('passwort') ||
    normalizedQuestion.includes('software') ||
    normalizedQuestion.includes('ausstattung') ||
    normalizedQuestion.includes('diensthandy') ||
    normalizedQuestion.includes('bahncard') ||
    normalizedQuestion.includes('dienstwagen')
  ) {
    return 'In der Ausstattungsauswahl kannst du deinen Bedarf unverbindlich vormerken. Eine Bestellung oder Installation wird im Prototyp nicht ausgelöst. Dienstwagen gibt es nur nach vorheriger Freigabe; den gültigen Katalog und Prozess müssen IT und P&O bestätigen. Teile hier keine Passwörter oder Zugangscodes.';
  }

  if (
    normalizedQuestion.includes('unterlagen') ||
    normalizedQuestion.includes('dokument') ||
    normalizedQuestion.includes('formular') ||
    normalizedQuestion.includes('p&o') ||
    normalizedQuestion.includes('people & organization')
  ) {
    return 'People & Organization (P&O)-Unterlagen bearbeitest du ausschließlich über den offiziellen, sicheren Kanal aus deiner Einladung. Lade hier bitte keine Dokumente oder persönlichen Angaben hoch.';
  }

  if (
    normalizedQuestion.includes('erster arbeitstag') ||
    normalizedQuestion.includes('tag 1') ||
    normalizedQuestion.includes('vor meinem ersten') ||
    normalizedQuestion.includes('erledigen') ||
    normalizedQuestion.includes('welcome days') ||
    normalizedQuestion.includes('coffee talk') ||
    normalizedQuestion.includes('kolleg')
  ) {
    return 'Prüfe Uhrzeit, Ort und Ansprechperson deiner Welcome Days. In der Demo kannst du Anreise, Unterkunftswunsch und Interesse an einem Coffee Talk vormerken; es wird nichts gebucht oder an Kolleg:innen übermittelt. Für verbindliche Planung nutze die offiziellen Kontakte aus deiner Einladung.';
  }

  if (normalizedQuestion.includes('anreise') || normalizedQuestion.includes('hotel') || normalizedQuestion.includes('ort') || normalizedQuestion.includes('standort')) {
    return 'Die für dich geltenden Orts- und Anreiseinformationen findest du in deiner Einladung. Die Demo-Auswahl bucht weder Reise noch Hotel. Wenn Angaben fehlen oder du Unterstützung brauchst, frag bitte People & Organization (P&O) über den dort genannten Kontakt.';
  }

  return 'Dazu habe ich noch keine verlässlich freigegebene Information. Schau bitte in deine Einladung oder frage People & Organization (P&O) über den dort genannten Kontakt. Teile hier keine persönlichen, vertraulichen oder besonders sensiblen Daten.';
};
