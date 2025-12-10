import FormInput from "./FormInput";

const MusicForm = ({
  register,
  errors,
  submitHandler,
  isSubmitting,
  buttonText,
  submittingText,
}) => {
  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Title"
          id="title"
          placeholder="Song Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title}
        />

        <FormInput
          label="Artist"
          id="artist"
          placeholder="Artist Name"
          {...register("artist", { required: "Artist is required" })}
          error={errors.artist}
        />

        <FormInput
          label="Genre"
          id="genre"
          placeholder="Genre"
          {...register("genre", { required: "Genre is required" })}
          error={errors.genre}
        />

        <FormInput
          label="Duration"
          id="duration"
          placeholder="e.g. 3:45"
          {...register("duration", { required: "Duration is required" })}
          error={errors.duration}
        />

        <FormInput
          label="Release Date"
          type="date"
          id="releaseDate"
          {...register("releaseDate", { required: "Release Date is required" })}
          error={errors.releaseDate}
        />

        <FormInput
          label="Rating"
          type="number"
          id="rating"
          placeholder="0.0 - 5.0"
          min="0"
          max="5"
          step="0.1"
          {...register("rating", { 
            required: "Rating is required",
            min: { value: 0, message: "Min rating is 0" },
            max: { value: 5, message: "Max rating is 5" }
          })}
          error={errors.rating}
        />
      </div>

      <FormInput
        label="Image URL"
        type="url"
        id="imageUrl"
        placeholder="https://..."
        {...register("imageUrl", { 
          required: "Image URL is required",
          pattern: {
            value: /^https?:\/\/.+/,
            message: "Invalid URL"
          }
        })}
        error={errors.imageUrl}
      />

      <FormInput
        label="Description"
        as="textarea"
        id="description"
        rows="4"
        placeholder="Album description or lyrics..."
        {...register("description", { required: "Description is required" })}
        error={errors.description}
      />

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isSubmitting ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {isSubmitting ? submittingText : buttonText}
        </button>
      </div>
    </form>
  );
};

export default MusicForm;
