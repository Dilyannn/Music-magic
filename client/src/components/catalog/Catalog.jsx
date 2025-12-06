import useRequest from '../../hooks/useRequest';

import MusicCardSmall from '../common/MusicCard';
import Spinner from '../common/Spinner';

function Catalog() {
  const { data: music, loading } = useRequest('/data/music?sortBy=_createdOn%20desc', []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        All <span className="text-purple-500">Records</span>
      </h2>

      {loading ? (
        <Spinner small={'45'} styles='flex text-xl leading-tight mb-6 justify-center' />
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