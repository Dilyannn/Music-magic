import React from 'react';

const Contact = () => {
  return (
    <div className="page-container flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-12 bg-linear-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Get in Touch
      </h1>
      
      <a 
        href="https://github.com/Dilyannn" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group bg-gray-800 p-8 rounded-2xl shadow-2xl hover:bg-gray-750 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 flex flex-col items-center gap-6 max-w-sm w-full"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="https://github.com/Dilyannn.png" 
            alt="Dilyan Yanev" 
            className="relative w-32 h-32 rounded-full border-4 border-gray-800 shadow-lg"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Dilyan Yanev</h2>
          <p className="text-gray-400 mb-4">@Dilyannn</p>
          <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span>View Profile</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Contact;