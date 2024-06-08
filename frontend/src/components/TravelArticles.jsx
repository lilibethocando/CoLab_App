import React from 'react';

const TravelArticles = () => {
    return (
        <div className="w-full pt-20 pb-20 flex flex-col items-center gap-5">
            <div className="w-full text-black text-5xl font-semibold font-roboto ">
                Travel Articles
            </div>
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-5">
                <div className="flex-1 flex flex-col items-start gap-8">
                    <div className="w-full bg-white border border-black flex flex-col items-start">
                        <div className="w-full p-6 flex flex-col items-start gap-5">
                            <div className="w-full flex flex-col items-start gap-5">
                                <div className="w-full text-black text-2xl font-bold font-roboto leading-[43.2px] break-words">
                                    How to Travel on a Budget for Beginners
                                </div>
                                <div className="w-full text-black text-base font-normal font-roboto leading-6 break-words">
                                    Advanced planning, strategic timing and collecting travel rewards can all get you a cheaper trip.
                                </div>
                            </div>
                            <div className="w-full flex justify-start items-center gap-5">
                                <button
                                    className="py-2 bg-[#ECBB40] rounded-lg flex justify-start items-center gap-2.5"
                                    onClick={() => window.open('https://www.nerdwallet.com/article/travel/a-beginners-guide-to-budget-travel/', '_blank')}
                                >
                                    <div className="text-black text-base font-normal font-roboto leading-6 break-words rounded-md p-1" style={{ background: '#ECBB40' }}>
                                        View Article
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <img className="w-full h-64 object-cover" src="/people.png" alt="Travel Article" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-5">
                        <div className="flex-1 bg-white border border-black flex flex-col items-start">
                            <div className="w-full p-2 flex flex-col items-start gap-2.5">
                                <div className="w-full flex flex-col items-start gap-2">
                                    <div className="w-full text-black text-lg font-bold font-roboto  break-words">
                                        How to Travel with Friends Without Becoming Enemies
                                    </div>
                                    <div className="w-full text-black text-base font-normal font-roboto leading-5 break-words">
                                        Practice the art of shuttle diplomacy. Don’t bicker over breakfast. Include a wildcard. Drop the intermittent fasting. And do not, for heaven’s sake, Splitwise the small stuff.
                                    </div>
                                </div>
                                <div className="w-full pt-2.5 flex justify-start items-center gap-6">
                                    <button
                                        className="py-4 bg-[#ECBB40] rounded-lg flex justify-start items-center gap-2.5"
                                        onClick={() => window.open('https://www.townandcountrymag.com/leisure/travel-guide/a43953293/travel-with-friends-etiquette-guide/', '_blank')}
                                    >
                                        <div className="text-black text-base font-normal font-roboto leading-6 break-words rounded-md p-1" style={{ background: '#ECBB40' }}>
                                            View Article
                                        </div>
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-white border border-black flex flex-col items-start">
                            <div className="w-full p-4 flex flex-col items-start">
                                <div className="w-full flex flex-col items-start gap-2">
                                    <div className="w-full text-black text-lg font-bold font-roboto leading-[33.6px] break-words">
                                        10 Useful International Travel Tips for First-Time Travelers
                                    </div>
                                    <div className="w-full text-black text-base font-normal font-roboto leading-5 break-words">
                                        Overcome your pre-departure jitters with our useful international travel tips for first-time travelers. Travel abroad like a pro!
                                    </div>
                                </div>
                                <div className="w-full flex justify-start items-center gap-5">
                                    <button
                                        className="py-3 bg-[#ECBB40] rounded-lg flex justify-start items-center gap-2.5"
                                        onClick={() => window.open('https://www.gooverseas.com/blog/best-international-travel-tips-for-first-time-travelers/', '_blank')}
                                    >
                                        <div className="text-black text-base font-normal font-roboto leading-6 break-words rounded-md p-1" style={{ background: '#ECBB40' }}>
                                            View Article
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <div className="w-full bg-white border border-black flex flex-row items-start">
                        <div className="w-full flex justify-center items-center">
                            <img className="w-full h-64 object-cover" src="/passport.png" alt="Travel Article" />
                        </div>
                        <div className="w-full p-6 flex flex-col items-start gap-3">
                            <div className="w-full flex flex-col items-start">
                                <div className="w-full text-black text-2xl font-bold font-roboto break-words">
                                    Best Travel Credit Cards of May 2024
                                </div>
                                <div className="w-full text-black text-base font-normal font-roboto leading-6 break-words">
                                    Whether you're traveling for business or pleasure, travel credit cards can help you save money.
                                </div>
                            </div>
                            <div className="w-full flex justify-start items-center gap-5">
                                <button
                                    className="bg-[#ECBB40] rounded-lg flex justify-start items-center gap-2.5"
                                    onClick={() => window.open('https://money.usnews.com/credit-cards/travel/', '_blank')}
                                >
                                    <div className="text-black text-base font-normal font-roboto leading-6 break-words rounded-md p-1" style={{ background: '#ECBB40' }}>
                                        View Article
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white border border-black flex flex-col items-start">
                        <div className="w-full pt-12 pb-12 pl-12 pr-12 flex flex-col items-start gap-2">
                            <div className="w-full flex flex-col items-start gap-6">
                                <div className="w-full text-black text-xl font-bold font-roboto leading-[43.2px] break-words">
                                    For travelers, sustainability is the word but there are many definitions of it
                                </div>
                                <div className="w-full text-black text-base font-normal font-roboto leading-6 break-words">
                                    Most people want to support sustainable tourism, even though the concept remains fuzzy.
                                </div>
                            </div>
                            <div className="w-full flex justify-start items-center gap-6">
                                <button
                                    className="py-2 bg-[#ECBB40] rounded-lg flex justify-start items-center gap-2.5"
                                    onClick={() => window.open('https://www.nationalgeographic.com/travel/article/what-sustainable-tourism-means/', '_blank')}
                                >
                                    <div className="text-black text-base font-normal font-roboto leading-6 break-words rounded-md p-1" style={{ background: '#ECBB40' }}>
                                        View Article
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <img className="w-full h-64 object-cover" src="/ocean.png" alt="Travel Article" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelArticles;
