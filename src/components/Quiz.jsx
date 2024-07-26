import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './quiz.css';
import Swal from 'sweetalert2';
import parse from 'html-react-parser';
import PaymentForm from './PaymentForm';


const Quiz = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const questionRef = useRef(null);
  const [showResultButton, setShowResultButton] = useState(false);
  // const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [optionStyle, setOptionStyle] = useState({});
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [disabledQuestions, setDisabledQuestions] = useState([]);
  let questionNumber = 1; 

  const handleResultSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShowResultButton(true);
    setDisabledQuestions(Object.keys(selectedAnswers));
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
    axios
      .get("https://ab.geoneer.com.np/amin/controlsurvey/")
      .then(response => {
        setIsLoaded(true);
        setItems(response.data);
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (questionRef.current) {
      const questionWidth = questionRef.current.getBoundingClientRect().width;
      const optionStyle = {
        width: questionWidth + 'px',
      };
      setOptionStyle(optionStyle);
    }
  }, [items]);

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
    // Check if the option is already selected for the given question
    if (!selectedAnswers[itemId] && !showResultButton) {
      setSelectedAnswers(prevState => ({
        ...prevState,
        [itemId]: option.toString(), // Convert the option to a string
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
      // Disable the option if the question is disabled
      return 'option disabled';
    } else {
      return 'option';
    }
  };

  const handleShowResultClick = () => {
    const count = Object.values(selectedAnswers).reduce((acc, selectedOption, index) => {
      const item = mergedItemsArray[index];
      if (selectedOption === item.correct_opt.toString()) {
        acc++;
      }
      return acc;
    }, 0);

    setShowResultDetails(true);

    Swal.fire({
      title: 'Result',
      text: `You answered ${count} questions correctly!`,
      icon: 'info',
    }).then(() => {
      // Store quiz data in local storage
      const quizData = {
        date: new Date().toLocaleString(),
        score: count,
      };
      localStorage.setItem('quizData', JSON.stringify(quizData));
    });
  };





  const attendedQuestionsCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-container">
      
      <h2>Pay the amount for Loksewa model Test</h2>
     
      <PaymentForm />
      <h1>Sample  Questions</h1>
      

      <div className="attendance-count">{attendedQuestionsCount} Questions Attended</div>

      {error && <div>Error: {error.message}</div>}

      {!isLoaded && !error && <div>Loading...</div>}

      {isLoaded && mergedItemsArray.length === 0 && <div>No items to display</div>}

      {isLoaded && mergedItemsArray.length > 0 && (
        <ul style={{ listStyle: 'none' }}>
          {mergedItemsArray.map(item => (
            <li key={item.id}>
              <h6>
                <p ref={questionRef} style={{ textAlign: 'left' }}>
                  Question {questionNumber++}: {parse(item.question)}
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
                  <p>Explanation: {item.expination}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {attendedQuestionsCount === mergedItemsArray.length && !showResultButton && (
        
        <button className="submit-button" onClick={handleResultSubmit}> Submit</button>
        
      )}

      {showResultButton && (
        <button className="show-result-button" onClick={handleShowResultClick} >Show Result</button>
      )}
    </div>
  );
};

export default Quiz;
