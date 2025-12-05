import { Link } from "react-router";

function MusicCardSmall({
  isNew,
  _id,
  title,
  artist,
  imageUrl,
  rating,
  duration,
  genre,
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 group">
      <div className="relative overflow-hidden h-48 bg-gray-900">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white truncate">{title}</h3>
          {isNew && (
            <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded text-white">
              New
            </span>
          )}
        </div>
        <p className="text-gray-400 mb-2 truncate">{artist}</p>
        <div className="flex justify-between items-center border-t border-gray-700 pt-4">
          <div className="flex items-center text-yellow-400">
            <span>★</span>
            <span className="ml-1 text-white">{rating}</span>
          </div>
          <span className="text-gray-400 text-sm">
            {genre}, {duration}
          </span>
        </div>
        <div className="mt-4">
          <Link
            to={`/catalog/${_id}`}
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MusicCardSmall;
