import type { PreboardingTask, QuickAction } from './types';

export const PREBOARDING_TASKS: PreboardingTask[] = [
  {
    id: 'first-day',
    title: 'Details zum ersten Tag prüfen',
    description: 'Uhrzeit, Treffpunkt und Ansprechperson stehen in deiner Einladung oder den Unterlagen von HR.',
    category: 'Organisation',
  },
  {
    id: 'documents',
    title: 'Unterlagen sicher erledigen',
    description: 'Nutze ausschließlich den offiziellen HR-Kanal aus deiner Einladung. Sende hier keine Dokumente.',
    category: 'Self-Service',
  },
  {
    id: 'equipment',
    title: 'Geräte- und Zugangshinweise lesen',
    description: 'Folge den Anweisungen aus der offiziellen IT-Kommunikation. Teile niemals Passwörter oder Codes.',
    category: 'IT',
  },
  {
    id: 'journey',
    title: 'Anreise oder ersten Remote-Tag planen',
    description: 'Prüfe die für dich geltenden Orts- und Anreiseinformationen in deiner Einladung.',
    category: 'Organisation',
  },
  {
    id: 'team',
    title: 'Dein Team kennenlernen',
    description: 'Wenn dir ein Buddy oder Kontakt genannt wurde, kannst du dich schon vorab bei der Person melden.',
    category: 'Menschen',
  },
  {
    id: 'questions',
    title: 'Offene Fragen sammeln',
    description: 'Für persönliche oder vertrauliche Themen wende dich direkt an deinen HR-Kontakt.',
    category: 'Self-Service',
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Was sollte ich vor Tag 1 erledigen?',
    prompt: 'Was sollte ich vor meinem ersten Arbeitstag erledigen?',
  },
  {
    label: 'Wo finde ich meine HR-Unterlagen?',
    prompt: 'Wo finde ich meine HR-Unterlagen?',
  },
  {
    label: 'Frage zu Laptop oder Zugang',
    prompt: 'Was mache ich bei Fragen zu Laptop oder Zugang?',
  },
  {
    label: 'Ich habe eine persönliche Frage',
    prompt: 'Wohin mit einer persönlichen oder vertraulichen Frage?',
  },
];

export const getPreboardingAnswer = (question: string): string => {
  const normalizedQuestion = question.toLocaleLowerCase('de');

  if (normalizedQuestion.includes('persönlich') || normalizedQuestion.includes('vertraulich')) {
    return 'Persönliche oder vertrauliche Anliegen gehören nicht in diesen Assistenten. Nutze dafür bitte direkt den HR-Kontakt aus deiner Einladung.';
  }

  if (
    normalizedQuestion.includes('laptop') ||
    normalizedQuestion.includes('zugang') ||
    normalizedQuestion.includes('passwort') ||
    normalizedQuestion.includes('it')
  ) {
    return 'Bitte nutze die offiziellen Hinweise aus der IT-Kommunikation. Teile hier keine Passwörter, Zugangscodes oder vertraulichen Gerätedaten. Wenn etwas fehlt, wende dich an den dort genannten IT-Kontakt.';
  }

  if (
    normalizedQuestion.includes('unterlagen') ||
    normalizedQuestion.includes('dokument') ||
    normalizedQuestion.includes('formular') ||
    normalizedQuestion.includes('hr')
  ) {
    return 'HR-Unterlagen und Formulare bearbeitest du ausschließlich über den offiziellen, sicheren HR-Kanal aus deiner Einladung. Lade hier bitte keine Dokumente oder persönlichen Angaben hoch.';
  }

  if (
    normalizedQuestion.includes('erster arbeitstag') ||
    normalizedQuestion.includes('tag 1') ||
    normalizedQuestion.includes('vor meinem ersten') ||
    normalizedQuestion.includes('erledigen')
  ) {
    return 'Prüfe vor allem die Angaben zu Uhrzeit, Treffpunkt und Ansprechperson, erledige bereitgestellte Formulare über den offiziellen HR-Kanal und lies die Gerätehinweise der IT. Die Vorbereitungsliste hilft dir beim Überblick.';
  }

  if (normalizedQuestion.includes('anreise') || normalizedQuestion.includes('ort') || normalizedQuestion.includes('standort')) {
    return 'Die für dich geltenden Orts- und Anreiseinformationen findest du in deiner Einladung. Falls sie fehlen oder nicht eindeutig sind, frag bitte den dort genannten HR-Kontakt.';
  }

  return 'Dazu habe ich noch keine verlässlich freigegebene Information. Schau bitte in deine Einladung oder frage den dort genannten HR-Kontakt. Teile hier keine persönlichen, vertraulichen oder besonders sensiblen Daten.';
};
