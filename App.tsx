import React, { useEffect, useState } from 'react';
import './App.css';
import {
  COFFEE_TALK_TOPICS,
  EQUIPMENT_OPTIONS,
  INITIAL_PROGRESS,
  PREBOARDING_STAGES,
  SOFTWARE_OPTIONS,
  STORAGE_KEY,
  TRAVEL_OPTIONS,
} from './constants';
import type { PreboardingProgress, PreboardingStageId } from './constants';

const isStageId = (value: unknown): value is PreboardingStageId =>
  PREBOARDING_STAGES.some((stage) => stage.id === value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isAllowedArray = (value: unknown, allowedValues: readonly string[]): value is string[] =>
  isStringArray(value) && value.every((item) => allowedValues.some((allowed) => allowed === item));

const isProgress = (value: unknown): value is PreboardingProgress => {
  if (typeof value !== 'object' || value === null) return false;
  const progress = value as Record<string, unknown>;

  return (
    isStageId(progress.activeStage) &&
    isAllowedArray(progress.completedStages, PREBOARDING_STAGES.map((stage) => stage.id)) &&
    new Set(progress.completedStages).size === progress.completedStages.length &&
    progress.completedStages.every(isStageId) &&
    isAllowedArray(progress.equipment, EQUIPMENT_OPTIONS.map((option) => option.id)) &&
    isAllowedArray(progress.software, SOFTWARE_OPTIONS.map((option) => option.id)) &&
    typeof progress.hasCarApproval === 'boolean' &&
    typeof progress.wantsCompanyCar === 'boolean' &&
    typeof progress.coffeeTalkInterest === 'boolean' &&
    isAllowedArray(progress.coffeeTalkTopics, COFFEE_TALK_TOPICS.map((topic) => topic.id)) &&
    (progress.travelMode === '' || TRAVEL_OPTIONS.some((option) => option.id === progress.travelMode)) &&
    typeof progress.needsAccommodation === 'boolean'
  );
};

const readProgress = (): { progress: PreboardingProgress; warning: string } => {
  try {
    const savedProgress = window.localStorage.getItem(STORAGE_KEY);
    if (!savedProgress) return { progress: INITIAL_PROGRESS, warning: '' };

    const parsedProgress: unknown = JSON.parse(savedProgress);
    if (!isProgress(parsedProgress)) {
      return {
        progress: INITIAL_PROGRESS,
        warning: 'Der gespeicherte Demo-Fortschritt war unvollständig und wurde zurückgesetzt.',
      };
    }

    return { progress: parsedProgress, warning: '' };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        progress: INITIAL_PROGRESS,
        warning: 'Der gespeicherte Demo-Fortschritt konnte nicht gelesen werden und wurde zurückgesetzt.',
      };
    }
    if (error instanceof DOMException) {
      return {
        progress: INITIAL_PROGRESS,
        warning: 'Der Browser kann den Demo-Fortschritt nicht lesen. Änderungen bleiben möglicherweise nicht erhalten.',
      };
    }
    throw error;
  }
};

const App: React.FC = () => {
  const [initialState] = useState(readProgress);
  const [progress, setProgress] = useState(initialState.progress);
  const [storageWarning, setStorageWarning] = useState(initialState.warning);
  const activeIndex = PREBOARDING_STAGES.findIndex((stage) => stage.id === progress.activeStage);
  const activeStage = PREBOARDING_STAGES[activeIndex];
  const isStageComplete = progress.completedStages.includes(activeStage.id);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      setStorageWarning('Speichern im Browser ist fehlgeschlagen. Dein Fortschritt ist möglicherweise nach dem Schließen der Seite weg.');
    }
  }, [progress]);

  const updateProgress = <Key extends keyof PreboardingProgress>(
    key: Key,
    value: PreboardingProgress[Key],
  ) => {
    setProgress((current) => ({ ...current, [key]: value }));
  };

  const toggleValue = (values: string[], value: string) =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  const openStage = (stageId: PreboardingStageId) => updateProgress('activeStage', stageId);

  const continueToNextStage = () => {
    const completedStages = progress.completedStages.includes(activeStage.id)
      ? progress.completedStages
      : [...progress.completedStages, activeStage.id];
    const nextStage = PREBOARDING_STAGES[activeIndex + 1];

    setProgress((current) => ({
      ...current,
      completedStages,
      activeStage: nextStage?.id ?? current.activeStage,
    }));
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    setStorageWarning('');
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
          <span>Dein Weg zu Tag 1</span>
        </div>
      </header>

      <main id="start" className="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">SCHÖN, DASS DU BALD DABEI BIST</p>
            <h1>Dein Start beginnt<br />schon hier.</h1>
            <p className="hero-description">
              Schritt für Schritt gut vorbereitet. Du erledigst nur, was gerade ansteht – und kannst
              später genau hier weitermachen.
            </p>
            <a className="primary-link" href="#deine-etappen">
              Meine Etappen ansehen <span aria-hidden="true">↓</span>
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

        <section className="privacy-strip" aria-label="Datenschutzhinweis zum Prototyp">
          <span className="privacy-icon" aria-hidden="true">◈</span>
          <p>
            <strong>Dein Fortschritt bleibt in diesem Browser.</strong> Dieser Prototyp speichert
            deine Demo-Auswahl lokal auf diesem Gerät. Es gibt kein Konto und keine Synchronisierung
            zwischen Geräten. Bitte trage keine Allergien oder andere vertrauliche Angaben ein.
          </p>
          <span className="privacy-label">PROTOTYP</span>
        </section>

        {storageWarning && <p className="storage-warning" role="status">{storageWarning}</p>}

        <section id="deine-etappen" className="journey-section" aria-labelledby="journey-title">
          <div className="journey-heading">
            <div>
              <p className="eyebrow">IN DEINEM TEMPO</p>
              <h2 id="journey-title">Deine Preboarding-Etappen</h2>
            </div>
            <div className="overall-progress">
              <span>{progress.completedStages.length} von {PREBOARDING_STAGES.length}</span> Etappen erledigt
            </div>
          </div>
          <p className="journey-intro">
            Die Zeitpunkte sind Orientierung. Öffne eine Etappe, wenn sie für dich passt. Nur eine
            Etappe wird gleichzeitig im Detail angezeigt.
          </p>

          <nav className="stage-navigation" aria-label="Preboarding-Etappen">
            {PREBOARDING_STAGES.map((stage, index) => {
              const completed = progress.completedStages.includes(stage.id);
              const active = progress.activeStage === stage.id;
              return (
                <button
                  className={`stage-nav-item${active ? ' stage-nav-active' : ''}${completed ? ' stage-nav-complete' : ''}`}
                  key={stage.id}
                  type="button"
                  aria-current={active ? 'step' : undefined}
                  onClick={() => openStage(stage.id)}
                >
                  <span className="stage-nav-number">{completed ? '✓' : `0${index + 1}`}</span>
                  <span className="stage-nav-copy">
                    <span className="stage-timing">{stage.timing}</span>
                    <span className="stage-nav-title">{stage.title}</span>
                  </span>
                  <span className="stage-nav-chevron" aria-hidden="true">→</span>
                </button>
              );
            })}
          </nav>

          <section className="stage-panel" aria-labelledby="stage-title">
            <div className="stage-panel-heading">
              <div className="stage-panel-icon" aria-hidden="true">
                {activeStage.id === 'getting-ready' ? '▣' : activeStage.id === 'getting-connected' ? '♡' : '↗'}
              </div>
              <div>
                <p className="eyebrow">{activeStage.timing}</p>
                <h3 id="stage-title">{activeStage.title}</h3>
                <p>{activeStage.description}</p>
              </div>
              {isStageComplete && <span className="completed-badge">Erledigt ✓</span>}
            </div>

            {activeStage.id === 'getting-ready' && (
              <div className="stage-content">
                <div className="form-section">
                  <h4>Was brauchst du zum Arbeiten?</h4>
                  <p>Markiere, was du voraussichtlich benötigst. Die Liste ist eine Demo und löst keine Bestellung aus.</p>
                  <div className="choice-grid">
                    {EQUIPMENT_OPTIONS.map((option) => (
                      <label className="choice-card" key={option.id}>
                        <input
                          type="checkbox"
                          checked={progress.equipment.includes(option.id)}
                          onChange={() => updateProgress('equipment', toggleValue(progress.equipment, option.id))}
                        />
                        <span className="choice-check" aria-hidden="true">✓</span>
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h4>Vorzuinstallierende Software</h4>
                  <p>Die tatsächlichen Softwarekataloge und Freigaben müssten später mit der IT abgestimmt werden.</p>
                  <div className="software-options">
                    {SOFTWARE_OPTIONS.map((option) => (
                      <label className="option-row" key={option.id}>
                        <input
                          type="checkbox"
                          checked={progress.software.includes(option.id)}
                          onChange={() => updateProgress('software', toggleValue(progress.software, option.id))}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section vehicle-section">
                  <h4>Dienstwagen</h4>
                  <p>Nur relevant, wenn dir die Nutzung bereits vorab freigegeben wurde.</p>
                  <label className="option-row">
                    <input
                      type="checkbox"
                      checked={progress.hasCarApproval}
                      onChange={(event) => setProgress((current) => ({
                        ...current,
                        hasCarApproval: event.target.checked,
                        wantsCompanyCar: event.target.checked && current.wantsCompanyCar,
                      }))}
                    />
                    <span>Die Nutzung eines Dienstwagens wurde mir bereits freigegeben.</span>
                  </label>
                  {progress.hasCarApproval && (
                    <label className="option-row vehicle-choice">
                      <input
                        type="checkbox"
                        checked={progress.wantsCompanyCar}
                        onChange={(event) => updateProgress('wantsCompanyCar', event.target.checked)}
                      />
                      <span>Ich möchte die Dienstwagenoption vormerken.</span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {activeStage.id === 'getting-connected' && (
              <div className="stage-content">
                <div className="form-section">
                  <h4>Schon vor dem ersten Tag ins Gespräch kommen?</h4>
                  <p>Ein freiwilliger Coffee Talk kann dir einen ersten Eindruck vom Team und Arbeitsalltag geben.</p>
                  <label className="option-row coffee-interest">
                    <input
                      type="checkbox"
                      checked={progress.coffeeTalkInterest}
                      onChange={(event) => updateProgress('coffeeTalkInterest', event.target.checked)}
                    />
                    <span>Ich hätte Interesse an einem lockeren Coffee Talk mit künftigen Kolleg:innen.</span>
                  </label>
                  {progress.coffeeTalkInterest && (
                    <fieldset className="topic-fieldset">
                      <legend>Worüber würdest du dich gern austauschen?</legend>
                      {COFFEE_TALK_TOPICS.map((topic) => (
                        <label className="option-row" key={topic.id}>
                          <input
                            type="checkbox"
                            checked={progress.coffeeTalkTopics.includes(topic.id)}
                            onChange={() => updateProgress('coffeeTalkTopics', toggleValue(progress.coffeeTalkTopics, topic.id))}
                          />
                          <span>{topic.label}</span>
                        </label>
                      ))}
                    </fieldset>
                  )}
                  <p className="inline-note">In diesem Prototyp wird niemand kontaktiert oder zugeordnet. Ein echtes Matching braucht einen freiwilligen, freigegebenen Prozess.</p>
                </div>
              </div>
            )}

            {activeStage.id === 'welcome-days' && (
              <div className="stage-content">
                <div className="form-section">
                  <h4>Wie planst du deine Anreise?</h4>
                  <p>Nutze für Datum und Ort die Informationen in deiner Einladung zu den Welcome Days.</p>
                  <label className="field-label" htmlFor="travel-mode">Bevorzugtes Verkehrsmittel</label>
                  <select
                    className="travel-select"
                    id="travel-mode"
                    value={progress.travelMode}
                    onChange={(event) => updateProgress('travelMode', event.target.value)}
                  >
                    <option value="">Bitte auswählen</option>
                    {TRAVEL_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                  <label className="option-row accommodation-choice">
                    <input
                      type="checkbox"
                      checked={progress.needsAccommodation}
                      onChange={(event) => updateProgress('needsAccommodation', event.target.checked)}
                    />
                    <span>Ich möchte Informationen zu einer Unterkunft erhalten.</span>
                  </label>
                  <p className="inline-note">Diese Demo bucht keine Reise und kein Hotel. Für verbindliche Planung nutze den Kontakt aus deiner Einladung.</p>
                </div>
                <div className="sensitive-data-note">
                  <span aria-hidden="true">◈</span>
                  <p><strong>Allergien oder Ernährungsbedarfe?</strong> Das sind sensible Gesundheitsangaben. Bitte nicht hier eintragen, sondern bei Bedarf über den sicheren P&amp;O-Kontakt aus deiner Einladung klären.</p>
                </div>
              </div>
            )}

            <div className="stage-actions">
              <button
                className="text-action"
                type="button"
                disabled={activeIndex === 0}
                onClick={() => openStage(PREBOARDING_STAGES[activeIndex - 1].id)}
              >
                ← Zur vorherigen Etappe
              </button>
              {activeIndex < PREBOARDING_STAGES.length - 1 ? (
                <button className="primary-action" type="button" onClick={continueToNextStage}>
                  Etappe abschließen &amp; weiter <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  className={`primary-action${isStageComplete ? ' action-complete' : ''}`}
                  type="button"
                  onClick={continueToNextStage}
                >
                  {isStageComplete ? 'Etappe erledigt ✓' : 'Etappe abschließen'}
                </button>
              )}
            </div>
          </section>
        </section>

        <section className="contact-card">
          <div className="contact-icon" aria-hidden="true">?</div>
          <div className="contact-copy">
            <h2>Du brauchst eine verbindliche Antwort?</h2>
            <p>Bei persönlichen oder vertraulichen Fragen hilft dir dein People-&amp;-Organization-Kontakt (P&amp;O) aus der Einladung weiter.</p>
          </div>
          <span className="contact-hint">Sicheren P&amp;O-Kontakt nutzen <span aria-hidden="true">→</span></span>
        </section>
      </main>

      <footer className="page-footer">
        <span>All for One <span aria-hidden="true">·</span> Preboarding</span>
        <span>Prototyp – Fortschritt wird nur lokal auf diesem Gerät gespeichert, nicht an P&amp;O übermittelt.</span>
        <button className="reset-action" type="button" onClick={resetProgress}>Fortschritt zurücksetzen</button>
      </footer>
    </div>
  );
};

export default App;
