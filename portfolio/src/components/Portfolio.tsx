import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <main className="portfolio-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </main>
  );
};

export default Portfolio;