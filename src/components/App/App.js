import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Patrons from '../Patrons/Patrons.js'
import Books from '../Books/Books.js'


function App() {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToBooks = () => {
    navigate('/books');
  };

  const navigateToPatrons = () => {
    navigate('/patrons');
  };

  return (  
    <div className="wrapper">
      <button onClick = {navigateToHome}>Home</button>
      <button onClick = {navigateToBooks}>Books</button>
      <button onClick = {navigateToPatrons}>Patrons</button>
      <h1>Library Manager</h1>
      Welcome! Click books to see current books list. Click patrons to see current patrons list
      <Routes>
          <Route path="/patrons" element={<Patrons />} />
          <Route path="/books" element={<Books />} />
          <Route path="/" element={null} />
      </Routes>
    </div>
  );
}

export default App;