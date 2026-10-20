# All for One Preboarding

Ein gestufter, datensparsamer UI-Prototyp für die Zeit vor dem ersten Arbeitstag. Statt eines Chatbots zeigt die Website jeweils eine Preboarding-Etappe: Ausstattung mit längerem Vorlauf, Kontakt zu Kolleg:innen einige Wochen vorher und Welcome Days kurz vor dem Start.

## Lokal starten

Voraussetzung: Node.js.

```sh
npm install
npm run dev
```

## Datenschutz im Prototyp

- Es werden keine Namen, E-Mail-Adressen oder Startdaten abgefragt. Die Demo-Auswahl kann unverbindliche Ausstattungs-, Software-, Anreise-, Unterkunfts- und Coffee-Talk-Präferenzen enthalten.
- Etappenstatus und Auswahl werden in `localStorage` auf dem aktuellen Browser und Gerät gespeichert, damit die Demo nach einem Neuladen fortgesetzt werden kann. Es gibt kein Konto, keine Synchronisierung zwischen Geräten und keine Übermittlung an einen Server. Die Schaltfläche „Fortschritt zurücksetzen“ löscht den Demo-Fortschritt.
- `localStorage` ist keine geschützte oder produktionsgeeignete Speicherung für personenbezogene Daten. Andere Personen mit Zugriff auf dasselbe Browserprofil können Demo-Auswahlen möglicherweise sehen. Bitte auf gemeinsam genutzten Geräten nicht mit persönlichen Angaben verwenden.
- Es gibt keine Verbindung zu einem externen KI-Dienst oder einer externen Schrift-/CSS-CDN.
- Sämtliche Eingaben sind lokale Entwürfe. Es wird keine Bestellung, Installation, Buchung, Zuordnung, P&O-/IT-Anfrage oder Übermittlung ausgeführt. Ein Dienstwagen kann nicht per Selbstauskunft freigegeben werden.
- Allergien und andere Gesundheitsdaten dürfen nicht in die Demo eingegeben werden. Dafür und für persönliche Anliegen verweist der Prototyp auf den sicheren P&O-Kontakt aus der Einladung.
- Bitte auch keine Passwörter, Zugangscodes, Bank-, Vertrags- oder sonstigen vertraulichen Angaben eingeben.

Diese technischen Maßnahmen sind keine Bestätigung einer DSGVO-Konformität. Beim Hosting können insbesondere Verbindungsdaten in Serverprotokollen anfallen. Die Demo sendet keine E-Mails und stellt keine Erinnerungen zu einem Startdatum zu. Vor einem Produktivbetrieb mit persönlichem, geräteübergreifendem Fortschritt, Einladungen oder E-Mail-Nurture braucht es ein geprüftes Backend und Authentifizierungs-/Zugriffskonzept. Auswahlen müssen an die tatsächlich zuständigen Stellen und deren Aufgaben-/Genehmigungssysteme angebunden sein; ein UI-Klick allein darf nicht als ausgelöste Beschaffung oder Freigabe dargestellt werden. Außerdem müssen Verantwortlichkeiten, Rechtsgrundlagen, Lösch- und Aufbewahrungsfristen, Hosting, Zugriffs- und Serverprotokolle sowie Informationspflichten mit Datenschutz und Informationssicherheit geprüft werden. Echte Softwarekataloge, Genehmigungs- und Vermittlungsprozesse sowie Unternehmensinformationen sind vor Veröffentlichung durch die jeweiligen Verantwortlichen freizugeben.
