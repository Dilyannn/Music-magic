const About = () => {
  return (
    <div className="page-container">
      <div className="text-center py-12 md:py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
          Music Magic
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          Your ultimate destination for discovering, sharing, and organizing the music that moves your soul.
        </p>
      </div>

      {/* How It Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:bg-gray-800 transition duration-300 border border-gray-700/50 group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">STEP 1</div>
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📝</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-400">Sign Up</h3>
          <p className="text-gray-400 leading-relaxed">
            Create your free account in seconds. Join our community to start building your personal music library.
          </p>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:bg-gray-800 transition duration-300 border border-gray-700/50 group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">STEP 2</div>
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">➕</div>
          <h3 className="text-2xl font-bold mb-4 text-pink-400">Add Music</h3>
          <p className="text-gray-400 leading-relaxed">
            Found a new favorite track? Add it to the catalog with details like artist, genre, and album art.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:bg-gray-800 transition duration-300 border border-gray-700/50 group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">STEP 3</div>
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎧</div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Manage & Enjoy</h3>
          <p className="text-gray-400 leading-relaxed">
            View your collection, edit details, or remove old tracks. Keep your music organized exactly how you like it.
          </p>
        </div>
      </div>

      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-16 mb-16 relative overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Simple & Powerful</h2>
          <p className="text-gray-300 text-lg leading-loose max-w-4xl mx-auto">
            <span className="text-purple-400 font-semibold">Music Magic</span> is designed to be the easiest way to track your music journey. 
            No complicated algorithms or cluttered interfaces—just a clean, simple space for you and your music.
          </p>
        </div>
        
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default About;