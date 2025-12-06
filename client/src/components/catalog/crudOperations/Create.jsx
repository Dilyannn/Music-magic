import { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../../hooks/useForm";
import useRequest from "../../../hooks/useRequest";

const Create = () => {
  const navigate = useNavigate();
  const { request } = useRequest();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, changeHandler, formAction } = useForm(
    async (data) => {
      try {
        await request("http://localhost:3030/data/music", "POST", data);
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
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={changeHandler}
                  required
                  className="form-input"
                  placeholder="Song Title"
                />
              </div>

              <div>
                <label
                  htmlFor="artist"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Artist
                </label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={values.artist}
                  onChange={changeHandler}
                  required
                  className="form-input"
                  placeholder="Artist Name"
                />
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={values.genre}
                  onChange={changeHandler}
                  required
                  className="form-input"
                  placeholder="Genre"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={values.duration}
                  onChange={changeHandler}
                  required
                  className="form-input"
                  placeholder="e.g. 3:45"
                />
              </div>

              <div>
                <label
                  htmlFor="releaseDate"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Release Date
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={values.releaseDate}
                  onChange={changeHandler}
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={values.rating}
                  onChange={changeHandler}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                  className="form-input"
                  placeholder="0.0 - 5.0"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={values.imageUrl}
                onChange={changeHandler}
                required
                className="form-input"
                placeholder="https://..."
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={changeHandler}
                required
                rows="4"
                className="form-input resize-none"
                placeholder="Album description or lyrics..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  isSubmitting ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Record"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
