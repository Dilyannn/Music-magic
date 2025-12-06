import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";
import FormInput from "./FormInput";

const Edit = () => {
  const navigate = useNavigate();
  const { musicId } = useParams();
  const {
    data: initialData,
    loading,
    request,
  } = useRequest(`/data/music/${musicId}`, {
    title: "",
    artist: "",
    genre: "",
    duration: "",
    releaseDate: "",
    imageUrl: "",
    rating: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, changeHandler, formAction, setValues } = useForm(
    async (data) => {
      try {
        await request(`/data/music/${musicId}`, "PUT", data);
        navigate(`/catalog/${musicId}`);
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
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Edit Music Record
          </h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Title"
                id="title"
                name="title"
                value={values.title || ""}
                onChange={changeHandler}
                required
                placeholder="Song Title"
              />

              <FormInput
                label="Artist"
                id="artist"
                name="artist"
                value={values.artist || ""}
                onChange={changeHandler}
                required
                placeholder="Artist Name"
              />

              <FormInput
                label="Genre"
                id="genre"
                name="genre"
                value={values.genre || ""}
                onChange={changeHandler}
                required
                placeholder="Genre"
              />

              <FormInput
                label="Duration"
                id="duration"
                name="duration"
                value={values.duration || ""}
                onChange={changeHandler}
                required
                placeholder="e.g. 3:45"
              />

              <FormInput
                label="Release Date"
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={values.releaseDate || ""}
                onChange={changeHandler}
                required
              />

              <FormInput
                label="Rating"
                type="number"
                id="rating"
                name="rating"
                value={values.rating || ""}
                onChange={changeHandler}
                required
                placeholder="0.0 - 5.0"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <FormInput
              label="Image URL"
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={values.imageUrl || ""}
              onChange={changeHandler}
              required
              placeholder="https://..."
            />

            <FormInput
              label="Description"
              as="textarea"
              id="description"
              name="description"
              value={values.description || ""}
              onChange={changeHandler}
              required
              rows="4"
              placeholder="Album description or lyrics..."
            />

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  isSubmitting ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
