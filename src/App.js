import React from 'react';
import OrderForm from '../src/components/OrderForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to our pizza parlor</h1>
      </header>
      <div>
        <OrderForm />
      </div>     
      <footer className="App-footer">
        <p>&copy; 2023 Pizza Ordering App</p>
      </footer>
    </div>
  );
}

export default App;
