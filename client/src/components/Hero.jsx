import React from "react";
import { Link } from "react-router";

const Hero = () => {
  const scrollToLatest = () => {
    const element = document.getElementById('latest-hits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 lg:w-5/12 mb-12 md:mb-0 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Discover & Share <br />
            <span className="text-purple-500 bg-clip-text">
              Music You Love.
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/catalog"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition duration-300 w-full sm:w-auto text-center"
            >
              Discover Now
            </Link>
            <button 
              onClick={scrollToLatest}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-300 font-bold"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </div>
              <span>Latest Hits</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-7/12 relative rounded-lg shadow-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Music Experience"
            className="relative rounded-2xl shadow-2xl shadow-amber-100 z-10 w-full object-cover h-64 md:h-96 lg:h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
