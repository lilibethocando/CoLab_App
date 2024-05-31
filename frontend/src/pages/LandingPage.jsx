import React from 'react'
import Navbar from '../components/NavBar'
import  TopSection  from '../components/TopSection.jsx';
import PopularDestinations from '../components/PopularDestinations.jsx';



const LandingPage = () => {
    return (
        <>
        <div className="max-w-6xl mx-auto pt-20 px-6">
        <TopSection />
        <PopularDestinations />
            </div>
        </>
    )
};

export default LandingPage;