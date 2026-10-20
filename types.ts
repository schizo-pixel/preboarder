export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export interface QuickAction {
  label: string;
  prompt: string;
}

export interface PreboardingTask {
  id: string;
  title: string;
  description: string;
  category: 'Organisation' | 'Self-Service' | 'IT' | 'Menschen' | 'P&O';
}

export interface PreboardingOption {
  id: string;
  label: string;
  description?: string;
}