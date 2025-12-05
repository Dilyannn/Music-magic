import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

import MusicCardSmall from '../common/MusicCard';

const LatestHits = () => {
  const [music, setMusic] = useState([]);
  const { request } = useRequest();

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const result = await request('http://localhost:3030/data/music?sortBy=_createdOn%20desc&pageSize=3', 'GET');
        setMusic(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHits();
  }, [request]);

  return (
    <div id="latest-hits" className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        Recently <span className="text-purple-500">Added</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {music.length > 0 ? (
          music.map((hit) => (
            <MusicCardSmall key={hit._id} {...hit} />
          ))
        ) : (
          <p className="text-gray-400">No hits found.</p>
        )}
      </div>
    </div>
  );
};

export default LatestHits;