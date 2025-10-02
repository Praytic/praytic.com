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
        return '';
      case 'itch':
        return '🎮';
      case 'youtube':
        return '';
      default:
        return '';
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