import { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";
import MusicForm from "./MusicForm";

const Create = () => {
  const navigate = useNavigate();
  const { request } = useRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, changeHandler, formAction } = useForm(
    async (data) => {
      try {
        await request("/data/music", "POST", data);
        navigate("/catalog");
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

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await formAction();
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Create Music Record
          </h2>
          <MusicForm
            values={values}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            isSubmitting={isSubmitting}
            buttonText="Create Record"
            submittingText="Creating..."
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
