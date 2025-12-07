import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useUserContext } from "../../../hooks/useUserContext";
import useRequest from "../../../hooks/useRequest";

import { PlayIcon, CalendarIcon, ClockIcon, StarIcon } from "./Icons";
import Spinner from "../../common/Spinner";
import Lyrics from "./Lyrics";

// TODO refactor comments into separate component
// TODO implement comment posting functionality
// TODO implement play button functionality
// TODO REFRACTOR the detail component into separate smaller components

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [music, setMusic] = useState({});
  const [loading, setLoading] = useState(true);

  const { request } = useRequest();
  const { user } = useUserContext();

  const isOwner = music._ownerId && user?._id === music._ownerId;

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

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const result = await request(`/data/music/${id}`, "GET");
        setMusic(result);
      } catch (err) {
        console.error(err);
        if (err.status === 404) {
          navigate("/404");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [id, request, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          
          <div className="md:w-1/3 lg:w-1/4 relative group">
            <img
              src={music.imageUrl}
              alt={music.title}
              className="w-full h-full object-cover"
            />
          </div>

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
                  <Link
                    to={`/edit/${id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={deleteHandler}
                    className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
            Description
          </h3>
          <div className="text-gray-300 space-y-6 leading-relaxed text-lg font-serif">
            <p>{music.description}</p>
          </div>

          <Lyrics title={music.title} artist={music.artist} />
        </div>

        <div className="lg:col-span-1"></div>
      </div>
    </div>
  );
};

export default Details;