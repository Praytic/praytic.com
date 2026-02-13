import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import Policy from './components/Policy';
import { projects } from './data';
import './App.css';

function HomePage() {
  return (
    <>
      <Header
        title="Praytic's Portfolio"
        subtitle="A curated collection of my most successful projects."
      />
      <Portfolio projects={projects} />
      <div className="google-data-notice">
        <p>
          Some applications in this portfolio use Google Sign-In for user authentication.
          When you use these services, we request access to your basic Google profile information
          (email address and name) to create and manage your account. The Places application uses
          Google Sign-In to enable secure user authentication and to associate your custom map markers
          with your account. The Grockery application uses Google Sign-In to authenticate users and
          create Google Sheets on their behalf for grocery list management. We collect and process
          this data solely for the purpose of providing the application functionality. No data is
          used for advertising, marketing, or shared with third parties except as necessary to
          operate the services (e.g., hosting providers). For complete details on how we handle
          your personal data, please review our Privacy Policy. You can manage your Google account
          permissions at any time through your Google Account settings.
        </p>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/policies/privacy-policy"
            element={<Policy policyFile="privacy-policy.md" title="Praytic Privacy Statement" />}
          />
          <Route
            path="/policies/terms-of-service"
            element={<Policy policyFile="terms-of-service.md" title="Praytic Terms of Service" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
