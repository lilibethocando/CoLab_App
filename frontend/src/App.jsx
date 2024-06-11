import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import SecondNavbar from './components/SecondNavbar';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUpPage';
import SignIn from './pages/SignInPage';
import PopularDestinations from './components/PopularDestinations';
import ItineraryPage from './pages/ItineraryPage';
import DestinationsPage from './pages/DestinationsPage';
import MyItineraries from './components/MyItineraries';
import MyItinerariesPage from './pages/MyItinerariesPage';
import ItineraryDetailPage from './pages/ItineraryDetailPage';

const App = () => {
  const location = useLocation();

  // Function to determine whether to render SecondNavbar
  const renderSecondNavbar = () => {
    const allowedPaths = ['/itinerary', '/myitineraries', '/itinerary/:id'];
    const currentPath = location.pathname;
  
  if (currentPath === '/itinerary') {
    // Don't render SecondNavbar for the /itinerary page
    return true;
  }
    return allowedPaths.some(path => location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Conditionally render either Navbar or SecondNavbar */}
      {renderSecondNavbar() ? <SecondNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/myitineraries" element={<MyItinerariesPage />} />
        <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
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