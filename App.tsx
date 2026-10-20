import React, { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import {
  COFFEE_TALK_TOPICS,
  EQUIPMENT_OPTIONS,
  getPreboardingAnswer,
  PREBOARDING_TASKS,
  QUICK_ACTIONS,
  SOFTWARE_OPTIONS,
  TRAVEL_OPTIONS,
} from './constants';
import type { Message } from './types';

const App: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hallo! Ich helfe dir bei der Vorbereitung auf deinen Start bei All for One. Ich beantworte nur allgemeine Fragen mit freigegebenen Informationen und verweise dich sonst an den offiziellen Kontakt.',
    },
  ]);
  const [question, setQuestion] = useState('');
  const messageSequence = useRef(0);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [carApproval, setCarApproval] = useState(false);
  const [requestedCar, setRequestedCar] = useState(false);
  const [travelMode, setTravelMode] = useState('');
  const [needsHotel, setNeedsHotel] = useState(false);
  const [coffeeTalkInterest, setCoffeeTalkInterest] = useState(false);
  const [coffeeTalkTopics, setCoffeeTalkTopics] = useState<string[]>([]);
  const [demoNotice, setDemoNotice] = useState('');

  const sendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    messageSequence.current += 1;
    const messageId = messageSequence.current;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `${messageId}-question`, role: 'user', text: trimmedText },
      { id: `${messageId}-answer`, role: 'assistant', text: getPreboardingAnswer(trimmedText) },
    ]);
    setQuestion('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(question);
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskId)
        ? currentTasks.filter((id) => id !== taskId)
        : [...currentTasks, taskId],
    );
  };

  const toggleSelection = (values: string[], value: string) =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#start" aria-label="All for One Preboarding Startseite">
          <span className="brand-mark">a1</span>
          <span className="brand-name">All for One</span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-product">Preboarding</span>
        </a>
        <div className="topbar-note">
          <span className="status-dot" />
          <span>Vor deinem ersten Arbeitstag</span>
        </div>
      </header>

      <main id="start" className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SCHÖN, DASS DU BALD DABEI BIST</p>
            <h1>Dein Start beginnt<br />schon hier.</h1>
            <p className="hero-description">
              Alles Wichtige für die Zeit vor deinem ersten Arbeitstag – übersichtlich an einem Ort.
              Ohne Anmeldung und ohne dass du persönliche Daten eingeben musst.
            </p>
            <a className="primary-link" href="#checkliste">
              Zur Vorbereitungsliste <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun">✦</div>
            <div className="art-card">
              <span className="art-card-icon">👋</span>
              <span>Dein nächstes Kapitel</span>
              <span className="art-card-arrow">↗</span>
            </div>
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">✦</div>
          </div>
        </section>

        <section className="privacy-strip" aria-label="Datenschutz im Prototyp">
          <span className="privacy-icon" aria-hidden="true">◈</span>
          <p>
            <strong>Privatsphäre zuerst.</strong> In diesem Prototyp wird kein externes KI-Modell
            verwendet. Deine Eingaben und Auswahlen werden nicht dauerhaft gespeichert.
            Allergien bitte nicht hier eintragen, sondern sicher an P&amp;O übermitteln.
          </p>
          <span className="privacy-label">PROTOTYP</span>
        </section>

        <div className="content-grid">
          <section id="checkliste" className="checklist-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">IN DEINEM TEMPO</p>
                <h2>Deine Vorbereitung</h2>
              </div>
              <div className="progress-count" aria-live="polite">
                <span>{completedTasks.length}</span> / {PREBOARDING_TASKS.length}
              </div>
            </div>
            <p className="section-intro">
              Eine kleine Orientierung für die nächsten Schritte. Deine Auswahl bleibt nur so lange
              sichtbar, wie diese Seite geöffnet ist.
            </p>
            <div className="task-list">
              {PREBOARDING_TASKS.map((task, index) => {
                const isComplete = completedTasks.includes(task.id);
                return (
                  <button
                    className={`task-item${isComplete ? ' task-complete' : ''}`}
                    key={task.id}
                    type="button"
                    aria-pressed={isComplete}
                    onClick={() => toggleTask(task.id)}
                  >
                    <span className="task-number">{isComplete ? '✓' : String(index + 1).padStart(2, '0')}</span>
                    <span className="task-content">
                      <span className="task-title">{task.title}</span>
                      <span className="task-description">{task.description}</span>
                    </span>
                    <span className="task-category">{task.category}</span>
                  </button>
                );
              })}
            </div>
            <div className="checklist-footer">
              <span className="footer-star" aria-hidden="true">✦</span>
              <p>Du musst nicht alles heute erledigen. Ein guter Start entsteht Schritt für Schritt.</p>
            </div>
          </section>

          <aside className="assistant-panel" aria-labelledby="assistant-title">
            <div className="assistant-heading">
              <div className="assistant-avatar" aria-hidden="true">a1</div>
              <div>
                <p className="eyebrow">DEIN PREBOARDING-ASSISTENT</p>
                <h2 id="assistant-title">Frag Aiko</h2>
              </div>
              <span className="assistant-online" aria-label="Im Prototyp verfügbar" />
            </div>
            <div className="chat-window" aria-live="polite" aria-relevant="additions">
              {messages.map((message) => (
                <div className={`chat-message message-${message.role}`} key={message.id}>
                  {message.role === 'assistant' && <span className="message-avatar" aria-hidden="true">a1</span>}
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <p className="quick-prompt-label">Womit kann ich dir helfen?</p>
            <div className="quick-actions">
              {QUICK_ACTIONS.map((action) => (
                <button key={action.label} type="button" onClick={() => sendMessage(action.prompt)}>
                  {action.label}<span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="question">Allgemeine Frage an Aiko</label>
              <input
                id="question"
                type="text"
                autoComplete="off"
                maxLength={500}
                placeholder="Stell eine allgemeine Frage ..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button type="submit" disabled={!question.trim()} aria-label="Nachricht senden">↑</button>
            </form>
            <p className="chat-disclaimer">Keine Namen, Passwörter, Gesundheits- oder Vertragsdaten eingeben.</p>
          </aside>
        </div>

        <section className="preboarding-tools" aria-label="Self-Service vor deinem Start">
          <div className="tool-section-heading">
            <p className="eyebrow">VORBEREITEN STATT HINTERHERLAUFEN</p>
            <h2>Was du vor deinem Start schon klären kannst</h2>
            <p>Die Auswahlen sind unverbindliche Prototyp-Demos: keine Bestellung, Buchung oder Übermittlung.</p>
          </div>

          <div className="tool-grid">
            <section className="tool-card equipment-card" aria-labelledby="equipment-title">
              <div className="tool-card-heading">
                <span className="tool-icon" aria-hidden="true">▣</span>
                <div>
                  <p className="eyebrow">SELF-SERVICE · DEMO</p>
                  <h3 id="equipment-title">Ausstattung &amp; Software</h3>
                </div>
              </div>
              <p className="tool-description">Markiere, was du voraussichtlich brauchst. IT- und P&amp;O-Kataloge sowie die tatsächlichen Genehmigungswege müssen noch angebunden werden.</p>
              <fieldset className="option-list">
                <legend>Büro-Hardware und Mobilität</legend>
                {EQUIPMENT_OPTIONS.map((option) => (
                  <label className="option-row" key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedEquipment.includes(option.id)}
                      onChange={() => {
                        setSelectedEquipment((values) => toggleSelection(values, option.id));
                        setDemoNotice('');
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
                <label className="option-row approval-row">
                  <input
                    type="checkbox"
                    checked={carApproval}
                    onChange={(event) => {
                      setCarApproval(event.target.checked);
                      if (!event.target.checked) setRequestedCar(false);
                      setDemoNotice('');
                    }}
                  />
                  <span>Dienstwagen-Freigabe liegt bereits vor <small>(Demo-Schalter, wird nicht geprüft)</small></span>
                </label>
                <label className={`option-row${!carApproval ? ' option-disabled' : ''}`}>
                  <input
                    type="checkbox"
                    checked={requestedCar}
                    disabled={!carApproval}
                    onChange={(event) => {
                      setRequestedCar(event.target.checked);
                      setDemoNotice('');
                    }}
                  />
                  <span>Dienstwagen <small>{carApproval ? '(vorherige Freigabe vorausgesetzt)' : '(erst nach vorheriger Freigabe auswählbar)'}</small></span>
                </label>
              </fieldset>
              <fieldset className="option-list">
                <legend>Vorzuinstallierende Software <span className="demo-label">Beispiele</span></legend>
                {SOFTWARE_OPTIONS.map((option) => (
                  <label className="option-row" key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedSoftware.includes(option.id)}
                      onChange={() => {
                        setSelectedSoftware((values) => toggleSelection(values, option.id));
                        setDemoNotice('');
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>
              <p className="sensitive-note"><strong>Gesundheitsdaten?</strong> Allergien oder Ernährungsbedarfe nicht hier eintragen. Bitte informiere P&amp;O über den sicheren Kontakt aus deiner Einladung.</p>
            </section>

            <section className="tool-card" aria-labelledby="welcome-title">
              <div className="tool-card-heading">
                <span className="tool-icon travel-icon" aria-hidden="true">↗</span>
                <div>
                  <p className="eyebrow">ORGANISATION · DEMO</p>
                  <h3 id="welcome-title">Welcome Days planen</h3>
                </div>
              </div>
              <p className="tool-description">Nutze Ort und Termine aus deiner Einladung. Hier kannst du deine Planung unverbindlich strukturieren.</p>
              <label className="field-label" htmlFor="travel-mode">Bevorzugtes Verkehrsmittel</label>
              <select
                id="travel-mode"
                value={travelMode}
                onChange={(event) => {
                  setTravelMode(event.target.value);
                  setDemoNotice('');
                }}
              >
                <option value="">Bitte auswählen</option>
                {TRAVEL_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <label className="option-row hotel-option">
                <input
                  type="checkbox"
                  checked={needsHotel}
                  onChange={(event) => {
                    setNeedsHotel(event.target.checked);
                    setDemoNotice('');
                  }}
                />
                <span>Ich möchte eine Unterkunft anfragen</span>
              </label>
              <button
                className="secondary-action"
                type="button"
                onClick={() => setDemoNotice('Deine Demo-Auswahl ist nur vorübergehend in dieser Seite sichtbar. Es wird nichts gebucht oder übermittelt.')}
              >
                Planung vormerken
              </button>
              <p className="sensitive-note"><strong>Hinweis:</strong> Diese Demo bucht weder Reise noch Hotel. Verbindliche Planung läuft über die in deiner Einladung genannten Kontakte.</p>
            </section>

            <section className="tool-card coffee-card" aria-labelledby="coffee-title">
              <div className="tool-card-heading">
                <span className="tool-icon coffee-icon" aria-hidden="true">☕</span>
                <div>
                  <p className="eyebrow">KONTAKTE · DEMO</p>
                  <h3 id="coffee-title">Coffee Talk mit Kolleg:innen</h3>
                </div>
              </div>
              <p className="tool-description">Ein lockeres Kennenlernen vor Tag 1 kann den Einstieg leichter machen. Wähle unverbindlich Themen, über die du dich gern austauschen würdest.</p>
              <label className="option-row interest-row">
                <input
                  type="checkbox"
                  checked={coffeeTalkInterest}
                  onChange={(event) => {
                    setCoffeeTalkInterest(event.target.checked);
                    setDemoNotice('');
                  }}
                />
                <span>Ich hätte Interesse an einem Coffee Talk</span>
              </label>
              {coffeeTalkInterest && (
                <fieldset className="option-list topic-list">
                  <legend>Mögliche Gesprächsthemen</legend>
                  {COFFEE_TALK_TOPICS.map((option) => (
                    <label className="option-row" key={option.id}>
                      <input
                        type="checkbox"
                        checked={coffeeTalkTopics.includes(option.id)}
                        onChange={() => {
                          setCoffeeTalkTopics((values) => toggleSelection(values, option.id));
                          setDemoNotice('');
                        }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              <button
                className="secondary-action"
                type="button"
                disabled={!coffeeTalkInterest}
                onClick={() => setDemoNotice('Dein Interesse ist nur vorübergehend in dieser Seite sichtbar. Es wird niemand kontaktiert oder zugeordnet.')}
              >
                Interesse vormerken
              </button>
              <p className="sensitive-note"><strong>Keine Vermittlung in der Demo.</strong> Für ein echtes freiwilliges Matching braucht es einen freigegebenen Prozess und passende Kontakte.</p>
            </section>
          </div>
          {demoNotice && <p className="demo-notice" role="status">{demoNotice}</p>}
        </section>

        <section className="contact-card">
          <div className="contact-icon" aria-hidden="true">?</div>
          <div className="contact-copy">
            <h2>Du brauchst eine verbindliche Antwort?</h2>
            <p>Bei persönlichen, vertraulichen oder hier nicht abgedeckten Fragen hilft dir dein People-&amp;-Organization-Kontakt (P&amp;O) aus der Einladung weiter.</p>
          </div>
          <span className="contact-hint">Sicheren P&amp;O-Kontakt nutzen <span aria-hidden="true">→</span></span>
        </section>
      </main>

      <footer className="page-footer">
        <span>All for One <span aria-hidden="true">·</span> Preboarding</span>
        <span>Prototyp – Inhalte und Datenschutzkonzept müssen vor einem Produktivbetrieb geprüft und freigegeben werden.</span>
      </footer>
    </div>
  );
};

export default App;
