import { Conversation } from '../types/chat';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    messages: [
      {
        id: '1',
        content: 'How do I get started with React?',
        role: 'user',
        timestamp: new Date('2024-02-20T10:00:00'),
      },
      {
        id: '2',
        content: 'To get started with React, first make sure you have Node.js installed. Then you can create a new React project using Create React App or Vite. Would you like me to explain the steps in detail?',
        role: 'assistant',
        timestamp: new Date('2024-02-20T10:01:00'),
      },
    ],
    timestamp: new Date('2024-02-20T10:00:00'),
  },
  {
    id: '2',
    title: 'TypeScript Tips',
    messages: [
      {
        id: '3',
        content: 'What are the benefits of using TypeScript?',
        role: 'user',
        timestamp: new Date('2024-02-20T11:00:00'),
      },
      {
        id: '4',
        content: 'TypeScript offers several benefits including static typing, better IDE support, and early error detection. It helps catch bugs before runtime and improves code maintainability.',
        role: 'assistant',
        timestamp: new Date('2024-02-20T11:01:00'),
      },
    ],
    timestamp: new Date('2024-02-20T11:00:00'),
  },
];