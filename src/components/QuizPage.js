import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPage.css';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizNumber, setSelectedQuizNumber] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the list of quizzes
  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://weekly50scraper.com/api/quizzes');
      setQuizzes(response.data);
      if (response.data.length > 0) {
        setSelectedQuizNumber(response.data[0].quiz_number);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the quiz data for the selected quiz
  const fetchQuizData = async (quizNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://weekly50scraper.com/api/quiz/${quizNumber}`);
      setQuizData(response.data);
    } catch (err) {
      setError(err);
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
    setSelectedQuizNumber(quizNumber);
  };

  return (
    <div id="quiz-page">
      <h1>Gaz Quiz</h1>
      <div className="quiz-header">
        {loading && <p>Loading quizzes...</p>}
        {error && <p>Error fetching data.</p>}
        {!loading && !error && quizzes.length > 0 && (
          <select value={selectedQuizNumber} onChange={handleQuizChange}>
            {quizzes.map(quiz => (
              <option key={quiz.quiz_number} value={quiz.quiz_number}>
                Quiz {quiz.quiz_number} - {quiz.quiz_date}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="quiz-questions">
        {loading && <p>Loading questions...</p>}
        {error && <p>Error fetching quiz data.</p>}
        {quizData && quizData.map((question) => (
          <p key={question.question_number}>
            <span className="question-number">{question.question_number}.</span> {question.question_text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
