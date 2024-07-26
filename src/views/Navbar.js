import React, { useContext,useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import userImage from './R.png'; // Change this to the correct path of the user's image
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar.css'




function Navbar() {
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem('authTokens');
  const [menuOpen, setMenuOpen] = useState(false);

  let username = '';

  if (token) {
    const decoded = jwt_decode(token);
    username = decoded.username;
    
  }

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close the menu when the window is resized to a larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <h4>
     <div style={{ display: 'flex', alignItems: 'center' }}>
      <nav  className="navbar navbar-expand-lg navbar-light fixed-top bg-white justify-content-between enhanced-navbar" >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
             <img style={{ width: '120px', padding: '6px' }} src={logo} alt="" />
          </a>
          
                    <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"  
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="navbarNav">
            <ul  className="navbar-nav">
              {token === null && (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/" onClick={closeMenu}>
                      Home
                    </a>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/quiz" onClick={closeMenu}>
                      Take a Quiz
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeMenu}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" onClick={closeMenu}>
                      Register
                    </Link>
                    
                  </li>
                  
                  <li className="nav-item">
                    <Link className="nav-link" to="/notice" onClick={closeMenu}>
                      Notice
                    </Link>
                  </li>

                
                </>
              )}

              {token !== null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard" onClick={closeMenu}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/quiz" onClick={closeMenu}>
                      Take a Quiz
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/rquiz" onClick={closeMenu}>
                      Take a RQuiz
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/chapterlist" onClick={closeMenu}>
                      Chapter Wise
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sallybus" onClick={closeMenu}>
                      Syllabus
                    </Link>
                  </li>
                  <li className="nav-item">
                  <button className="nav-link" onClick={() => {
                                                      logoutUser();
                                                      closeMenu();
                                                    }} style={{ cursor: 'pointer', border: 'none', background: 'none' }}>
                             Logout
                    </button>
                  </li>
                  <li className="nav-item ml-auto d-flex align-items-center text-right user-greeting"> 
                    <span>Hello, {username}!</span>
                    <img
                      src={userImage}
                      alt="User Profile"
                      className="user-avatar rounded-circle ml-2"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
      </nav>
    </div>
    </h4>
  );
}

export default Navbar;
