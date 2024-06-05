import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUpPage';
import SignIn from './pages/SignInPage';
import TopSection from './components/TopSection';
import PopularDestinations from './components/PopularDestinations';
import TestPage from './pages/TestPage';
import ItineraryPage from './pages/ItineraryPage';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />

        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<PopularDestinations />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;