import React, { useEffect, useState ,useCallback} from 'react';
import { useQuizResults } from './QuizResultsContext'; // Import the context
import './dashboard.css'; // Import your custom CSS file
import axios from 'axios';

const Dashboard = () => {
  const { quizResults, clearQuizResults } = useQuizResults();
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBackendData = async () => {
    try {
      const response = await axios.get('http://ab.geoneer.com.np/api/api/quiz-results/');
      setBackendData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setLoading(false);
    }
  };

  const submitQuizResultsToBackend = useCallback(async () => {
    try {
      const response = await axios.post('http://ab.geoneer.com.np/api/api/quiz-results/', quizResults);
      console.log('Quiz results submitted to backend:', response.data);
      // Optionally, clear quiz results after successful submission
      clearQuizResults();
    } catch (error) {
      console.error('Error submitting quiz results to backend:', error);
    }
  }, [quizResults, clearQuizResults]);
  
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchBackendData();

    // Set up an interval to periodically fetch data from the backend (e.g., every 5 minutes)
    const intervalId = setInterval(fetchBackendData, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [quizResults.length, submitQuizResultsToBackend]); // Include missing dependencies in the useEffect dependency array

  return (
    <div className="dashboard-container">
      <h2>Your Quiz Results</h2>
     

      {loading && <p>Loading data...</p>}

      {backendData.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Time Taken</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {backendData.map((result, index) => (
              <tr key={index}>
                <td>{result.timeTaken.toString()}</td>
                <td>{result.score}</td>
                <td>{result.percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {quizResults.length > 0 && (
        <div>
          <h3>Your Recent Quiz Results</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Time Taken</th>
                <th>Score</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.timeTaken.toString()}</td>
                  <td>{result.score}</td>
                  <td>{result.percentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={submitQuizResultsToBackend}>Submit Quiz Results</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
