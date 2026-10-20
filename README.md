# All for One Preboarding

Ein datensparsamer UI-Prototyp für Informationen und Self-Service vor dem ersten Arbeitstag. Er ist bewusst kein allgemeiner Onboarding-Assistent: Im Mittelpunkt stehen die Vorbereitung vor Tag 1, offizielle HR-/IT-Kanäle und eine Checkliste, die keine Anmeldung voraussetzt.

## Lokal starten

Voraussetzung: Node.js.

```sh
npm install
npm run dev
```

## Datenschutz im Prototyp

- Es werden keine Namen, Startdaten oder sonstigen personenbezogenen Angaben abgefragt.
- Checklistenstatus und Chatverlauf existieren nur im Arbeitsspeicher der geöffneten Seite; es gibt keine Speicherung in Cookies oder `localStorage`.
- Der Chat verwendet lokale, fest hinterlegte Antworten. Es gibt keine Verbindung zu einem externen KI-Dienst oder einer externen Schrift-/CSS-CDN.
- Bitte keine Passwörter, Zugangscodes, Gesundheits-, Bank-, Vertrags- oder sonstigen vertraulichen Angaben eingeben.
- Für verbindliche oder persönliche Anliegen verweist der Prototyp an den offiziellen HR-/IT-Kontakt in der Einladung.

Diese technischen Maßnahmen sind keine Bestätigung einer DSGVO-Konformität. Vor einem Produktivbetrieb müssen unter anderem Inhalte und Zwecke, Verantwortlichkeiten, Rechtsgrundlagen, Lösch- und Aufbewahrungsfristen, Hosting, Zugriffs- und Serverprotokolle sowie die Informationspflichten mit Datenschutz und Informationssicherheit geprüft werden. Unternehmens- und Prozessinformationen sind vor Veröffentlichung durch die jeweiligen Verantwortlichen freizugeben.
