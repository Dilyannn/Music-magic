import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";

import MusicForm from "./MusicForm";
import Spinner from "../../common/Spinner";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: initialData,
    loading,
    request,
    error,
  } = useRequest(`/data/music/${id}`, {
    title: "",
    artist: "",
    genre: "",
    duration: "",
    releaseDate: "",
    imageUrl: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (error && error.status === 404) {
      navigate("/404");
    }
  }, [error, navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, changeHandler, formAction, setValues } = useForm(
    async (data) => {
      try {
        await request(`/data/music/${id}`, "PUT", data);
        navigate(`/catalog/${id}`);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
      }
    },
    {
      title: "",
      artist: "",
      genre: "",
      duration: "",
      releaseDate: "",
      imageUrl: "",
      rating: "",
      description: "",
    }
  );

  useEffect(() => {
    if (initialData && !loading) {
      setValues(initialData);
    }
  }, [initialData, loading, setValues]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await formAction();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Edit Music Record
          </h2>
          <MusicForm
            values={values}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            isSubmitting={isSubmitting}
            buttonText="Save Changes"
            submittingText="Saving..."
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
