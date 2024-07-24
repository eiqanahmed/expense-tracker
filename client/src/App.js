// src/App.js

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import MonthlyExpenses from './pages/MonthlyExpenses';
import DailySpending from './pages/DailySpending';
import History from './pages/History';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
          <Route path="/daily-spending" element={<DailySpending />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
