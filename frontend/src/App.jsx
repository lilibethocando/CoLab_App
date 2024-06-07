import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUpPage';
import SignIn from './pages/SignInPage';
import PopularDestinations from './components/PopularDestinations';
import TestPage from './pages/TestPage';
import ItineraryPage from './pages/ItineraryPage';
import DestinationsPage from './pages/DestinationsPage'; 

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if the current path is not /itinerary */}
      {location.pathname !== '/itinerary' && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />  
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
