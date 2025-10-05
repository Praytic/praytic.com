import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'youtd2',
    icon: '🏰',
    title: 'YouTD 2',
    description: 'Classic community-driven session-based Tower Defense game with RPG elements built in Godot. 163 ⭐',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Praytic/youtd2' },
      { platform: 'itch', url: 'https://praytic.itch.io/youtd2' },
      { platform: 'youtube', url: 'https://youtd2.com' }
    ],
    status: 'Live',
    isDiscovered: true,
    url: 'https://github.com/Praytic/youtd2'
  },
  {
    id: 'chatgpt-notion-tagger',
    icon: '🏷️',
    title: 'ChatGPT Notion Tagger',
    description: 'AI-powered integration to automatically tag and categorize web pages in Notion using ChatGPT. 18 ⭐',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Praytic/chatgpt-notion-auto-tagging' }
    ],
    status: 'Live',
    isDiscovered: true,
    url: 'https://github.com/Praytic/chatgpt-notion-auto-tagging'
  },
  {
    id: 'places',
    icon: '📍',
    title: 'Places',
    description: 'React app that allows to pin places on the map with custom emojis',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Praytic/places' }
    ],
    status: 'Live',
    isDiscovered: true,
    url: 'https://github.com/Praytic/places'
  },
  {
    id: 'neural-network-visualizer',
    icon: '❓',
    title: 'Neural Network Visualizer',
    description: 'Interactive neural network training visualization tool with real-time graph analytics',
    socialLinks: [],
    status: 'Dev',
    isDiscovered: false
  },
  {
    id: 'blockchain-portfolio-tracker',
    icon: '❓',
    title: 'Blockchain Portfolio Tracker',
    description: 'Comprehensive cryptocurrency portfolio management app with advanced analytics',
    socialLinks: [],
    status: 'Dev',
    isDiscovered: false
  },
  {
    id: 'ar-furniture-planner',
    icon: '❓',
    title: 'AR Furniture Planner',
    description: 'Augmented reality interior design and furniture placement tool for mobile devices',
    socialLinks: [],
    status: 'Dev',
    isDiscovered: false
  },
  {
    id: 'realtime-code-collaboration',
    icon: '❓',
    title: 'Real-time Code Collaboration',
    description: 'Next-generation collaborative coding environment with AI assistance and live sharing',
    socialLinks: [],
    status: 'Dev',
    isDiscovered: false
  }
];