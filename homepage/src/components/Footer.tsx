import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/auth/privacy" className="footer-link">
            Privacy Policy
          </a>
          <span className="footer-separator">|</span>
          <a href="/auth/terms" className="footer-link">
            Terms of Service
          </a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Praytic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;