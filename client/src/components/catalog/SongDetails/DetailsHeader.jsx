import { Link, useNavigate } from "react-router";
import useRequest from "../../../hooks/useRequest";
import { CalendarIcon, ClockIcon, StarIcon } from "./Icons";

const DetailsHeader = ({ music, isOwner, id }) => {
  const navigate = useNavigate();
  const { request } = useRequest();

  const deleteHandler = async () => {
    const hasConfirmed = window.confirm(
      `Are you sure you want to delete ${music.title}?`
    );

    if (hasConfirmed) {
      try {
        await request(`/data/music/${id}`, "DELETE");
        navigate("/catalog");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-8 md:w-2/3 lg:w-3/4 flex flex-col justify-center relative bg-linear-to-r from-gray-900 to-gray-800">
      <div className="z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {music.title}
        </h1>
        <p className="text-purple-400 text-lg font-medium mb-6">
          {music.genre}
        </p>

        <div className="text-gray-400 text-sm mb-6 space-y-1">
          <p>
            Artist:{" "}
            <span className="text-white font-medium hover:underline cursor-pointer">
              {music.artist}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-6 text-gray-400 text-sm">
          <div className="flex items-center" title="Release Date">
            <CalendarIcon />
            <span>{music.releaseDate}</span>
          </div>
          <div className="flex items-center" title="Duration">
            <ClockIcon />
            <span>{music.duration}</span>
          </div>
          <div className="flex items-center" title="Rating">
            <StarIcon />
            <span>{music.rating}</span>
          </div>
        </div>

        {isOwner && (
          <div className="mt-6 flex space-x-4">
            <Link to={`/edit/${id}`}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors"
            >
              Edit
            </Link>

            <button onClick={deleteHandler}
              className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
