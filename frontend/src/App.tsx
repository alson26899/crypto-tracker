import React from 'react';
import StockPage from '../src/components/stock-page/StockPage'; // Adjust the path as per your project structure
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock and Crypto Tracker</h1>
      </header>
      <main>
        <StockPage />
      </main>
    </div>
  );
};

export default App;
