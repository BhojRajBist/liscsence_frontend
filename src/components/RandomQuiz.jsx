import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './quiz.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import { useQuizResults } from './QuizResultsContext';





const RandomQuiz = () => {
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
  // const [quizAttempts, setQuizAttempts] = useState([]); // State to store quiz attempts
  const history = useHistory();
  const { addQuizResult } = useQuizResults();

  const [startTime, setStartTime] = useState(null); // Track quiz start time
  const [hasPushedResult, setHasPushedResult] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  
 
  const handleResultSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
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
    
    // axios
    
    //   .get("https://ab.geoneer.com.np/amin/random_chapter_quiz/")
    //   .then(response => {
    //     setIsLoaded(true);
    //     setItems(response.data);
    //   })
    //   .catch(error => {
    //     setIsLoaded(true);
    //     setError(error);
    //   });

  
    // const fetchedQuizAttempts = [
  
    // ];
    // setQuizAttempts(fetchedQuizAttempts);
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


  const startQuiz = () => {
    setStartTime(new Date());
    axios
    
    .get("https://ab.geoneer.com.np/amin/random_chapter_quiz/")
    .then(response => {
      setIsLoaded(true);
      setItems(response.data);
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
    if (!hasPushedResult){

    const count = Object.values(selectedAnswers).reduce((acc, selectedOption, index) => {
      const item = mergedItemsArray[index];
      if (selectedOption === item.correct_opt.toString()) {
        acc++;
      }
      return acc;
    }, 0);

    const totalQuestions = mergedItemsArray.length;
    const currentTime = new Date();
    const score = count;
    const percentage = (count / totalQuestions) * 100;

    // Add the result to the context
    const result = {
      timeTaken: currentTime,
      score: score,
      percentage: percentage,
    };
    addQuizResult(result);

    setShowResultDetails(true);

    Swal.fire({
      title: 'Result',
      text: `You answered ${count} questions correctly!`,
      icon: 'info',
    }).then(() => {
      // Navigate to the dashboard route after showing the result
      window.location.href = '/dashboard';
    });
    setHasPushedResult(true);
  }
  };

  const attendedQuestionsCount = Object.keys(selectedAnswers).length;

  return (

    
    <div className="quiz-container">
      
      {!startTime && (
        <button  className="show-result-button" onClick={startQuiz}>Start Quiz</button>
      )}

 

      <h1>Random Questions</h1>

      <div className="attendance-count">{attendedQuestionsCount} Questions Attended</div>
      
      <div className="time-display" >
                {console.log("startTime:", startTime)}
                {console.log("elapsedTime:", elapsedTime)}

                {startTime && (
                  <p>{formatElapsedTime(elapsedTime)}</p>
                    )}
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
                  Question {questionNumber++}  :{parse(item.question)}
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
                <button className="submit-button" onClick={handleResultSubmit}>Submit</button>
              )}
              
        </ul>

        
      )}

     

      {showResultButton && (
        <button className="show-result-button" onClick={handleShowResultClick}>Show Result</button>
      )}

    </div>
  );
};

export default RandomQuiz;
