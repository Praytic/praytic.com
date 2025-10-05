import React, { useState } from 'react';
import { Project, SocialLink } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on social badges
    if ((e.target as HTMLElement).closest('.social-badge')) {
      return;
    }

    if (project.isDiscovered && project.url) {
      window.open(project.url, '_blank');
    } else {
      // Add shake animation for undiscovered projects
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Don't navigate if focus is on social badge
      if ((e.target as HTMLElement).closest('.social-badge')) {
        return;
      }
      handleCardClick(e as any);
    }
  };

  const getSocialIcon = (platform: SocialLink['platform']) => {
    switch (platform) {
      case 'github':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'itch':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c.02.28.23.56.53.56 1.18-.02 1.99.7 1.99 1.42 0 .78-.84 1.42-1.86 1.42-.37 0-.7.28-.7.66v3.78c0 .37.33.7.7.7 1.02 0 1.86.63 1.86 1.42 0 .78-.84 1.42-1.86 1.42-.37 0-.7.28-.7.66v3.78c0 .37.33.7.7.7h20.9c.37 0 .7-.33.7-.7v-3.78c0-.37-.33-.66-.7-.66-1.02 0-1.86-.63-1.86-1.42 0-.78.84-1.42 1.86-1.42.37 0 .7-.33.7-.7V6.56c0-.37-.33-.66-.7-.66-1.02 0-1.86-.63-1.86-1.42 0-.72.81-1.44 1.99-1.42.3 0 .51-.28.53-.56V3.98c-.02-.62-2.08-2.99-3.13-3.612C18.02.05 15.68-.02 12 0 8.32-.02 5.98.05 3.13 1.338z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default: // website
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        );
    }
  };

  return (
    <article
      className={`app-card ${project.isDiscovered ? 'discovered' : 'undiscovered'} ${isShaking ? 'shake' : ''}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
    >
      <div className="card-content">
        <div className="card-icon">{project.icon}</div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
        <div className="social-badges">
          {project.socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className={`social-badge ${social.platform}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View on ${social.platform}`}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
          {!project.isDiscovered && (
            <>
              <div className="social-badge github"></div>
              {project.id !== 'chatgpt-notion-tagger' && <div className="social-badge itch"></div>}
              {project.id === 'blockchain-portfolio-tracker' || project.id === 'realtime-code-collaboration' ? (
                <div className="social-badge youtube"></div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <div className="status-badge">{project.status}</div>
    </article>
  );
};

export default ProjectCard;
