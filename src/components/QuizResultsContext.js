// import React, { createContext, useContext, useState } from 'react';

// const QuizResultsContext = createContext();

// export const QuizResultsProvider = ({ children }) => {
//   const [quizResults, setQuizResults] = useState([]);

//   const addQuizResult = (result) => {
//     setQuizResults((prevResults) => [...prevResults, result]);
//   };

//   const clearQuizResults = () => {
//     setQuizResults([]);
//   };

//   return (
//     <QuizResultsContext.Provider value={{ quizResults, addQuizResult, clearQuizResults }}>
//       {children}
//     </QuizResultsContext.Provider>
//   );
// };

// export const useQuizResults = () => {
//   return useContext(QuizResultsContext);
// };
import React, { createContext, useContext, useState } from 'react';

const QuizResultsContext = createContext();

const QuizResultsProvider = ({ children }) => {
  const [quizResults, setQuizResults] = useState([]);

  const addQuizResult = (result) => {
    setQuizResults((prevResults) => [...prevResults, result]);
  };

  const clearQuizResults = () => {
    setQuizResults([]);
  };

  return (
    <QuizResultsContext.Provider value={{ quizResults, addQuizResult, clearQuizResults }}>
      {children}
    </QuizResultsContext.Provider>
  );
};

const useQuizResults = () => {
  const context = useContext(QuizResultsContext);
  if (!context) {
    throw new Error('useQuizResults must be used within a QuizResultsProvider');
  }
  return context;
};

export { QuizResultsProvider, useQuizResults };


