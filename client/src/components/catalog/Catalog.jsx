import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

import MusicCardSmall from '../common/MusicCard';
import Spinner from '../common/Spinner';

function Catalog() {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const result = await request('http://localhost:3030/data/music?sortBy=_createdOn%20desc', 'GET');
        setMusic(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [request]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        All <span className="text-purple-500">Music</span>
      </h2>

      {loading ? (
        <Spinner styles="flex text-xl leading-tight mb-6 justify-center" />
      ) : music.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {music.map((props) => (
            <MusicCardSmall key={props._id} {...props} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-400 text-xl">No music records found.</p>
        </div>
      )}
    </div>
  );
}

export default Catalog;