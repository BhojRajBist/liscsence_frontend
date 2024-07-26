import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from './context/AuthContext'

import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './components/Dashboard'
import Navbar from './views/Navbar'
import Quiz from './components/Quiz'
import RandomQuiz from './components/RandomQuiz'

// import Notice from './noticeandsallybus/Notice'
import Sallybus from './noticeandsallybus/Sallybus'
import Chapter from './surveyofficer/Chapter';
import ChapterCard from './surveyofficer/ChapterCard';




function App() {
  return (
    <Router>
      <AuthProvider>
        < Navbar/>
 
        <Switch>
          
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={RandomQuiz} path="/rquiz" exact />
          <PrivateRoute component={Quiz} path="/quiz" exact />
          <PrivateRoute component={Sallybus} path="/sallybus" exact />
        
          <Route component={Loginpage} path="/login" />
          <Route component={Registerpage} path="/register" exact />
          <Route component={ChapterCard} path="/chapterlist" exact />
          <Route component={Chapter} path="/chapter" exact />
          <Route component={Homepage} path="/" exact />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App