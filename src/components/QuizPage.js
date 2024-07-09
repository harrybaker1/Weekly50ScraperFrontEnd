import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizNumber, setSelectedQuizNumber] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const API_KEY = '32004-FRXNY-49352-KFOWL';

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://weekly50scraper.com/api/quizzes', {
        headers: {
          'x-api-key': API_KEY
        }
      });
      setQuizzes(response.data);
      if (response.data.length > 0) {
        setSelectedQuizNumber(response.data[0].quiz_number);
      }
    } catch (err) {
      setError('Error fetching quizzes.');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizData = async (quizNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://weekly50scraper.com/api/quiz/${quizNumber}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      setQuizData(response.data);
    } catch (err) {
      setError('Error fetching quiz data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuizNumber !== null) {
      fetchQuizData(selectedQuizNumber);
    }
  }, [selectedQuizNumber]);

  const handleQuizChange = (event) => {
    const quizNumber = parseInt(event.target.value, 10);
    setShowAnswers(false)
    setSelectedQuizNumber(quizNumber);
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <div id="quiz-page">
      <h1 className="header">Gaz Quiz</h1>
      <div className="quiz-header">
        {loading && <p>Loading quizzes...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && quizzes.length > 0 && (
          <select value={selectedQuizNumber} onChange={handleQuizChange}>
            {quizzes.map(quiz => (
              <option key={quiz.quiz_number} value={quiz.quiz_number}>
                Quiz {quiz.quiz_number} - {quiz.formatted_date}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="quiz-questions">
        {loading && <p>Loading questions...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && quizData.length > 0 && quizData.map((question) => (
          <div key={question.question_number} className="question-container">
            <div className="question-number-container">
              <span className="question-dot"></span>
              <span className="question-number">{question.question_number}.</span>
            </div>
            <span className="question-text">
              {question.question_text}
            </span>
          </div>
        ))}
      </div>
      <button className='answer-button' onClick={toggleShowAnswers}>
        Show Answers!
      </button>
      {showAnswers && (
        <div className="quiz-answers">
          {quizData.length > 0 && quizData.map((question) => (
            <div key={question.question_number} className="answer-container">
              <span className="answer-number">{question.question_number}.</span>
              <span className="answer-text">{question.question_answer}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
