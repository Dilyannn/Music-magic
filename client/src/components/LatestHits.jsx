import React, { useState, useEffect } from 'react';

const LatestHits = () => {
  const [hits, setHits] = useState([]);

  useEffect(() => {
    const fetchHits = async () => {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData = [
        { id: 1, title: "Midnight Jazz", artist: "Smooth Trio", genre: "Jazz", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80", rating: 4.8 },
        { id: 2, title: "Electric Dreams", artist: "Neon Pulse", genre: "Electronic", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=80", rating: 4.5 },
        { id: 3, title: "Acoustic Soul", artist: "Sarah Jenkins", genre: "Soul", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=800&q=80", rating: 4.9 },
        { id: 4, title: "Urban Beats", artist: "City Sound", genre: "Hip Hop", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80", rating: 4.2 },
      ];
      setHits(mockData);
    };

    fetchHits();
  }, []);

  return (
    <div id="latest-hits" className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        Recently <span className="text-purple-500">Added</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hits.map((hit) => (
          <div key={hit.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
            <div className="relative overflow-hidden">
                <img src={hit.image} alt={hit.title} className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white truncate">{hit.title}</h3>
                <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded text-white">New</span>
              </div>
              <p className="text-gray-400 mb-2 truncate">{hit.artist}</p>
              <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                <div className="flex items-center text-yellow-400">
                  <span>★</span>
                  <span className="ml-1 text-white">{hit.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{hit.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHits;