import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

import MusicCardSmall from '../common/MusicCard';
import Spinner from '../common/Spinner';

const LatestHits = () => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const result = await request('http://localhost:3030/data/music?sortBy=_createdOn%20desc&pageSize=4', 'GET');
        setMusic(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHits();
  }, [request]);

  return (
    <div id="latest-hits" className="container mx-auto px-6 py-30">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        Recently <span className="text-purple-500">Added</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <Spinner small={'45'} styles='flex text-xl leading-tight mb-6 justify-center' />
          </div>
        ) : music.length > 0 ? (
          music.map((props) => (
            <MusicCardSmall key={props._id} isNew={true} {...props} />
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <p className="text-gray-400">No hits found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestHits;