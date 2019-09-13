import React from 'react';
import './App.css';

import FeedLog from './components/FeedLog';

function App() {
  return (
    <div>
      <header>
        <h1>Baby feedings</h1>
      </header>
      <section>
        <FeedLog />
      </section>
    </div>
  );
}

export default App;
