import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Patrons from '../Patrons/Patrons.js'
import Books from '../Books/Books.js'
import EditableTable from '../Checkout/EditableTable.js'
import Checkout from '../Checkout/Checkout.js';
import Returns from '../Returns/Returns.js';
import Report from '../Report/Report';



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

  const navigateToCheckouts = () => {
    navigate('/checkout');
  };

  const navigateToReturns = () => {
    navigate('/returns');
  };

  const navigateToReport = () => {
    navigate('/report');
  };

  const navigateToTable = () => {
    navigate('/table');
  };

  return (  
    <div className="wrapper">
      <button onClick = {navigateToHome}>Home</button>
      <button onClick = {navigateToBooks}>Books</button>
      <button onClick = {navigateToPatrons}>Patrons</button>
      <button onClick = {navigateToTable}>Patrons Table</button>
      <button onClick = {navigateToCheckouts}>Checkouts</button>
      <button onClick = {navigateToReturns}>Returns</button>
      <button onClick = {navigateToReport}>Report</button>
      <h1>Library Manager</h1>
      Welcome! Click books to see current books list. Click patrons to see current patrons list
      <Routes>
          <Route path="/patrons" element={<Patrons />} />
          <Route path="/books" element={<Books />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/table" element={<EditableTable />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={null} />
      </Routes>
    </div>
  );
}

export default App;