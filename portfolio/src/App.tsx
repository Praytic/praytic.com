import React from 'react';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import { projects } from './data';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header
        title="Praytic's Portfolio"
        subtitle="A curated collection of my most successful projects. Only featuring apps with 10+ GitHub stars."
      />
      <Portfolio projects={projects} />
    </div>
  );
}

export default App;
