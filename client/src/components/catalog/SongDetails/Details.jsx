import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import useRequest from "../../../hooks/useRequest";
import UserContext from "../../../contexts/UserContext";
import Spinner from "../../common/Spinner";

const Details = () => {
  const { id } = useParams();
  const [music, setMusic] = useState({});
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const { user } = useContext(UserContext);

  const isOwner = music._ownerId && user?._id === music._ownerId;

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const result = await request(
          `http://localhost:3030/data/music/${id}`,
          "GET"
        );
        setMusic(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [id, request]);

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
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 transform hover:scale-105 transition-all">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
                </svg>
              </button>
            </div>
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
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>{music.releaseDate}</span>
                </div>
                <div className="flex items-center" title="Duration">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{music.duration}</span>
                </div>
                <div className="flex items-center" title="Rating">
                  <svg
                    className="w-4 h-4 mr-2 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
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
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors">
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
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
            Comments
          </h3>

          <div className="mb-8 bg-gray-800 p-4 rounded-lg">
            <textarea
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 resize-none text-sm"
              rows="3"
              placeholder="Add a comment..."
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
                Post
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex space-x-4 group">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                  E
                </div>
              </div>
              <div className="grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">
                    EvahFolkner
                  </span>
                  <span className="text-gray-500 text-xs">5 years ago</span>
                </div>
                <p className="text-gray-300 text-sm">Very good!</p>
                <div className="flex items-center space-x-4 mt-2 text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="hover:text-purple-400 flex items-center transition-colors">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714.211 1.412.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                    29
                  </button>
                  <button className="hover:text-red-400 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714-.211-1.412-.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 group">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                  I
                </div>
              </div>
              <div className="grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">
                    I don't know
                  </span>
                  <span className="text-gray-500 text-xs">5 years ago</span>
                </div>
                <p className="text-gray-300 text-sm">
                  This is one of the best rhyming schemes I've ever seen
                </p>
                <div className="flex items-center space-x-4 mt-2 text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="hover:text-purple-400 flex items-center transition-colors">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714.211 1.412.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                    23
                  </button>
                  <button className="hover:text-red-400 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714-.211-1.412-.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
