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
      { platform: 'website', url: 'https://youtd2.com' },
      { platform: 'youtube', url: 'https://www.youtube.com/@YouTD2-zj5be' }
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
    id: 'postgresql-schema-migration',
    icon: '🗄️',
    title: 'PostgreSQL Schema Migration',
    description: 'Automated PostgreSQL schema migration tool using Pulumi for infrastructure as code',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Praytic/postgresql-schema-migration-pulumi' }
    ],
    status: 'Live',
    isDiscovered: true,
    url: 'https://github.com/Praytic/postgresql-schema-migration-pulumi'
  },
  {
    id: 'spotify-telegram-playlist',
    icon: '🎵',
    title: 'Spotify Telegram Playlist Creator',
    description: 'Telegram bot that creates Spotify playlists from shared music links in chats',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/Praytic/spotify-telegram-playlist-creator' }
    ],
    status: 'Live',
    isDiscovered: true,
    url: 'https://github.com/Praytic/spotify-telegram-playlist-creator'
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
  }
];
