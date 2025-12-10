import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useRequest from "../../../hooks/useRequest";

import MusicForm from "./MusicForm";

const Create = () => {
  const navigate = useNavigate();
  const { request } = useRequest();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await request("/data/music", "POST", data);
      toast.success("Music record created successfully!");
      navigate("/catalog");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create record");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Create Music Record
          </h2>
          <MusicForm
            register={register}
            errors={errors}
            submitHandler={handleSubmit(onSubmit)}
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
