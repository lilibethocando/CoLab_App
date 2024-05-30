import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUpPage';
import SignIn from './pages/SignInPage';
import TopSection from './components/TopSection';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />

        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;