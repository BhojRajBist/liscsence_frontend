import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../components/quiz.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import { useQuizResults } from '../components/QuizResultsContext';
import { useLocation } from 'react-router-dom';

const Chapter = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const questionRef = useRef(null);
  const [showResultButton, setShowResultButton] = useState(false);
  const [optionStyle, setOptionStyle] = useState({});
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [disabledQuestions, setDisabledQuestions] = useState([]);
  let questionNumber = 1;
  const history = useHistory();
  // const { addQuizResult } = useQuizResults();

  const [startTime, setStartTime] = useState(null);
  const [hasPushedResult, setHasPushedResult] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const location = useLocation();
  const chapterId = location.state?.chapterId;
  const additionalProp = location.state?.additionalProp;

  const handleResultSubmit = (e) => {
    e.preventDefault();
    setShowResultButton(true);
    setDisabledQuestions(Object.keys(selectedAnswers));
    setStartTime(new Date());
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showResultButton) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showResultButton]);

  useEffect(() => {
    if (questionRef.current) {
      const questionWidth = questionRef.current.getBoundingClientRect().width;
      const optionStyle = {
        width: questionWidth + 'px',
      };
      setOptionStyle(optionStyle);
    }
  }, [items]);

  const startQuiz = () => {
    setStartTime(new Date());
    axios
    .get(` ${additionalProp} `)
      .then(response => {
        setIsLoaded(true);
        const shuffledQuestions = response.data.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 20);
        setItems(selectedQuestions);
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error);
      });
  };

  useEffect(() => {
    if (startTime && !hasPushedResult) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const elapsedTimeInSeconds = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsedTimeInSeconds);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime, hasPushedResult]);

  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const mergedItems = items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = item;
    } else {
      acc[item.id] = { ...acc[item.id], ...item };
    }
    return acc;
  }, {});

  const mergedItemsArray = Object.values(mergedItems);

  const handleOptionClick = (itemId, option) => {
    if (!selectedAnswers[itemId] && !showResultButton) {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [itemId]: option.toString(),
      }));
    }
  };

  const getOptionClassName = (itemId, option) => {
    const item = mergedItemsArray.find(item => item.id === itemId);
    const selectedOption = selectedAnswers[itemId];

    if (selectedOption === option.toString()) {
      if (showResultButton) {
        if (selectedOption !== item.correct_opt.toString()) {
          return 'option wrong';
        }
      }
      return 'option selected';
    } else if (disabledQuestions.includes(itemId)) {
      return 'option disabled';
    } else {
      return 'option';
    }
  };

  const handleShowResultClick = () => {
    if (!hasPushedResult) {
      const count = Object.values(selectedAnswers).reduce((acc, selectedOption, index) => {
        const item = mergedItemsArray[index];
        if (selectedOption === item.correct_opt.toString()) {
          acc++;
        }
        return acc;
      }, 0);

      const totalQuestions = mergedItemsArray.length;
      const currentTime = new Date();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      const score = count;
      const percentage = (count / totalQuestions) * 100;

      // Add the result to the context
      const result = {
        timeTaken: elapsedTimeInSeconds,
        score: score,
        percentage: percentage,
      };

      // Send the result to the backend API
      axios.post('http://ab.geoneer.com.np/api/api/quiz-results/', result)
        .then(response => {
          console.log('Quiz result submitted to backend:', response.data);
        })
        .catch(error => {
          console.error('Error submitting quiz result to backend:', error);
        });

      setShowResultDetails(true);

      Swal.fire({
        title: 'Result',
        text: `You answered ${count} questions correctly!`,
        icon: 'info',
      }).then(() => {
        history.push('');
      });

      setHasPushedResult(true);
    }
  };


  const attendedQuestionsCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-container">
      {!startTime && (
        <button className="show-result-button" onClick={startQuiz}>
          Start Quiz
        </button>
      )}

  
      <h1>Chapter {chapterId}</h1>
      <p></p>


      <div className="attendance-count">{attendedQuestionsCount} Questions Attended</div>

      <div className="time-display">
        {startTime && <p>{formatElapsedTime(elapsedTime)}</p>}
      </div>

      {error && <div>Error: {error.message}</div>}

      {!isLoaded && !error && <div>Loading...</div>}

      {isLoaded && mergedItemsArray.length === 0 && <div>No items to display</div>}

      {isLoaded && mergedItemsArray.length > 0 && (
        <ul style={{ listStyle: 'none' }}>
          {mergedItemsArray.map(item => (
            <li key={item.id}>
              <h6>
                <p ref={questionRef} style={{ textAlign: 'left' }}>
                  Question {questionNumber++} : {parse(item.question)}
                </p>
              </h6>
              <ul style={{ listStyleType: 'none' }}>
                <li
                  className={getOptionClassName(item.id, "a")}
                  onClick={() => handleOptionClick(item.id, "a")}
                  style={optionStyle}
                >
                  <span className="option-text">{item.option1}</span>
                </li>
                <li
                  className={getOptionClassName(item.id, "b")}
                  onClick={() => handleOptionClick(item.id, "b")}
                  style={optionStyle}
                >
                  <span className="option-text">{item.option2}</span>
                </li>
                <li
                  className={getOptionClassName(item.id, "c")}
                  onClick={() => handleOptionClick(item.id, "c")}
                  style={optionStyle}
                >
                  <span className="option-text">{item.option3}</span>
                </li>
                <li
                  className={getOptionClassName(item.id, "d")}
                  onClick={() => handleOptionClick(item.id, "d")}
                  style={optionStyle}
                >
                  <span className="option-text">{item.option4}</span>
                </li>
              </ul>
              {showResultDetails && (
                <div className="result-details">
                  <p>Correct Option: {item.correct_opt}</p>
                  <p>Explanation: {item.explanation}</p>
                </div>
              )}
            </li>
          ))}

          {attendedQuestionsCount === mergedItemsArray.length && !showResultButton && (
            <button className="submit-button" onClick={handleResultSubmit}>
              Submit
            </button>
          )}
        </ul>
      )}

      {showResultButton && (
        <button className="show-result-button" onClick={handleShowResultClick}>
          Show Result
        </button>
      )}
    </div>
  );
};

export default Chapter;