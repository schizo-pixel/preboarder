import React, { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import { getPreboardingAnswer, PREBOARDING_TASKS, QUICK_ACTIONS } from './constants';
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
            verwendet. Deine Eingaben und Checklisten-Häkchen werden nicht dauerhaft gespeichert.
            Bitte gib hier keine persönlichen oder vertraulichen Informationen ein.
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

        <section className="contact-card">
          <div className="contact-icon" aria-hidden="true">?</div>
          <div className="contact-copy">
            <h2>Du brauchst eine verbindliche Antwort?</h2>
            <p>Bei persönlichen, vertraulichen oder hier nicht abgedeckten Fragen hilft dir dein HR-Kontakt aus der Einladung weiter.</p>
          </div>
          <span className="contact-hint">Kontakt aus der Einladung nutzen <span aria-hidden="true">→</span></span>
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
