import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PasswordInput from './components/PasswordInput';
import QuizPage from './components/QuizPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (password, navigate) => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate('/quiz');
      }, 1000); // 1-second delay
      return true;
    } else {
      return false;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PasswordInput onSubmit={handlePasswordSubmit} />} />
        <Route
          path="/quiz"
          element={isAuthenticated ? <QuizPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
