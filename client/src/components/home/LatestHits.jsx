import { useState, useEffect } from 'react';

import MusicCardSmall from '../MusicCard'

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
          <MusicCardSmall key={hit.id} {...hit} />
        ))}
      </div>
    </div>
  );
};

export default LatestHits;