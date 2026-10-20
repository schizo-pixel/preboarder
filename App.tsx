import React from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { OnboardingTour } from './components/OnboardingTour'; // <- Import wieder rein
import { DEFAULT_KNOWLEDGE_BASE } from './constants';

const App: React.FC = () => {
  const knowledgeBase = DEFAULT_KNOWLEDGE_BASE;

  return (
    <div className="flex flex-col h-screen bg-white">
      <OnboardingTour /> {/* <- Komponente wieder rein */}
      <Header />
      <main className="flex-1 overflow-hidden relative">
        <ChatInterface knowledgeBase={knowledgeBase} />
      </main>
    </div>
  );
};

export default App;
