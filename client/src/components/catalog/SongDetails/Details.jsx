import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useUserContext } from "../../../hooks/useUserContext";
import useRequest from "../../../hooks/useRequest";

import Spinner from "../../common/Spinner";
import Lyrics from "./Lyrics";
import DetailsHeader from "./DetailsHeader";
import Comments from "./Comments";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { user } = useUserContext();
  const { data: music, loading, error } = useRequest(`/data/music/${id}`, {});

  const isOwner = music._ownerId && user?._id === music._ownerId;

  useEffect(() => {
    if (error && error.status === 404) {
      navigate("/404");
    }
  }, [error, navigate]);

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

          <DetailsHeader 
            music={music} 
            isOwner={isOwner} 
            id={id} 
          />
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

        <div className="lg:col-span-1">
          <Comments musicId={id} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

export default Details;