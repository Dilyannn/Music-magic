import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
  } = useRequest(`/data/music/${id}`, null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {},
    values: initialData,
  });

  useEffect(() => {
    if (error && error.status === 404) {
      navigate("/404");
    }
  }, [error, navigate]);

  const onSubmit = async (data) => {
    try {
      await request(`/data/music/${id}`, "PUT", data);
      toast.success("Music record updated successfully!");
      navigate(`/catalog/${id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update record");
    }
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
            register={register}
            errors={errors}
            submitHandler={handleSubmit(onSubmit)}
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
