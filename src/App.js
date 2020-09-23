import React from 'react';
import './style.scss';
import Dashboard from "./containers/Dashboard";
import AppError from "./components/AppError";

function App() {

  return (
    <div className="App">
        <AppError />
        <Dashboard />
    </div>
  );
}

export default App;
