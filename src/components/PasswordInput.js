import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordInput.css';

const PasswordInput = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (password.length === 4) {
      const isCorrect = onSubmit(password, navigate);
      if (!isCorrect) {
        setTimeout(() => setPassword(''), 500);
      }
    }
  }, [password, onSubmit, navigate]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    // Only allow numeric input and ensure length is <= 4
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPassword(value);
    }
  };

  const handleBlur = () => {
    inputRef.current.focus();
  };

  return (
    <div id="app-cover">
      <div id="cover">
        <i className="fas fa-lock" id="key-icon"></i>
        <form id="key-cover" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type="password"
            id="key"
            maxLength="4"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </form>
        <div id="key-dots" className={password.length === 4 ? 'active' : ''}>
          <div id="dots">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`dot ${password.length > i ? 'white' : ''}`}>
                <span className="show">{password.length > i ? '' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
