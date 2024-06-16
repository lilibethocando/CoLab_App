import React from 'react';
import TopSection from '../components/TopSection';
import PopularDestinations from '../components/PopularDestinations';
import TravelArticles from '../components/TravelArticles';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="bg-F0F5F7">
            <div className="max-w-6xl mx-auto pt-20 px-6">
                <TopSection />
                <PopularDestinations />
                <TravelArticles />
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
