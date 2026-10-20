export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
  timestamp: Date;
}

export interface QuickAction {
  label: string;
  prompt: string;
  icon: string;
}

export interface AppConfig {
  knowledgeBase: string;
}