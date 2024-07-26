import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { QuizResultsProvider } from './components/QuizResultsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <QuizResultsProvider>
      <App />
    </QuizResultsProvider>
  </React.StrictMode>
   
);
