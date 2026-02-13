import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/policies/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>
          <span className="footer-separator">|</span>
          <Link to="/policies/terms-of-service" className="footer-link">
            Terms of Service
          </Link>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Praytic. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;