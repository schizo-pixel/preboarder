# All for One Preboarding

Ein datensparsamer UI-Prototyp für Informationen und Self-Service vor dem ersten Arbeitstag. Er ist bewusst kein allgemeiner Onboarding-Assistent: Im Mittelpunkt stehen die Vorbereitung vor Tag 1, P&O (People & Organization), IT und eine Checkliste, die keine Anmeldung voraussetzt.

## Lokal starten

Voraussetzung: Node.js.

```sh
npm install
npm run dev
```

## Datenschutz im Prototyp

- Es werden keine Namen, E-Mail-Adressen oder Startdaten abgefragt. Die Demo-Auswahl kann unverbindliche Ausstattungs-, Software-, Anreise-, Unterkunfts- und Coffee-Talk-Präferenzen enthalten.
- Checklistenstatus, Auswahl und Chatverlauf existieren nur im Arbeitsspeicher der geöffneten Seite. Die App sendet sie nicht an einen Server; es gibt keine Speicherung in Cookies oder `localStorage`.
- Der Chat verwendet lokale, fest hinterlegte Antworten. Es gibt keine Verbindung zu einem externen KI-Dienst oder einer externen Schrift-/CSS-CDN.
- Dienstwagen ist in der Demo nur nach einem nicht verifizierten Freigabe-Schalter auswählbar. Keine Bestellung, Installation, Buchung, Zuordnung oder Übermittlung wird ausgeführt.
- Allergien und andere Gesundheitsdaten dürfen nicht in die Demo eingegeben werden. Dafür und für persönliche Anliegen verweist der Prototyp auf den sicheren P&O-Kontakt aus der Einladung.
- Bitte auch keine Passwörter, Zugangscodes, Bank-, Vertrags- oder sonstigen vertraulichen Angaben eingeben.

Diese technischen Maßnahmen sind keine Bestätigung einer DSGVO-Konformität. Beim Hosting können insbesondere Verbindungsdaten in Serverprotokollen anfallen. Vor einem Produktivbetrieb müssen unter anderem Inhalte und Zwecke, Verantwortlichkeiten, Rechtsgrundlagen, Lösch- und Aufbewahrungsfristen, Hosting, Zugriffs- und Serverprotokolle sowie die Informationspflichten mit Datenschutz und Informationssicherheit geprüft werden. Echte Softwarekataloge, Genehmigungs- und Vermittlungsprozesse sowie Unternehmensinformationen sind vor Veröffentlichung durch die jeweiligen Verantwortlichen freizugeben.
