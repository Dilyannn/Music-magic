import { useForm } from "react-hook-form";
import { useUserContext } from "../../../hooks/useUserContext";
import useRequest from "../../../hooks/useRequest";

const Comments = ({ musicId, isOwner }) => {
  const { isAuthenticated } = useUserContext();

  const query = new URLSearchParams({
    where: `musicId="${musicId}"`,
    load: `author=_ownerId:users`,
  });

  const {
    data: comments,
    request,
    setData: setComments,
  } = useRequest(`/data/comments?${query.toString()}`, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await request("/data/comments", "POST", {
        musicId,
        text: data.comment,
      });

      const updatedComments = await request(
        `/data/comments?${query.toString()}`,
        "GET"
      );
      setComments(updatedComments);

      reset();
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        Comments
      </h3>

      {isAuthenticated && !isOwner && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 bg-gray-800 p-4 rounded-lg"
        >
          <textarea
            {...register("comment", { required: "Comment cannot be empty" })}
            className={`w-full bg-gray-900 border ${errors.comment ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 resize-none text-sm`}
            rows="3"
            placeholder="Add a comment..."
          ></textarea>
          {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-400 italic">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex space-x-4 group">
              <div className="grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white text-sm">
                    {comment.author?.email || "Anonymous"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {comment._createdOn
                      ? new Date(comment._createdOn).toLocaleDateString()
                      : "Just now"}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
