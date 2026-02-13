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
