import React from 'react'
import Navbar from '../components/NavBar'
import  TopSection  from '../components/TopSection.jsx';
import PopularDestinations from '../components/PopularDestinations.jsx';
import TravelArticles from '../components/TravelArticles.jsx';



const LandingPage = () => {
    return (
        <>
        <div className="max-w-6xl mx-auto pt-20 px-6">
        <TopSection />
        <PopularDestinations />
        <TravelArticles />
            </div>
        </>
    )
};

export default LandingPage;