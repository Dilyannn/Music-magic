import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../hooks/useUserContext";

import HeaderAuth from "./others/HeaderAuth.jsx";
import ButtonSvg from "./others/ButtonSvg.jsx";
import AuthLink from "./others/AuthLink.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { loginHandler } = useUserContext();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginHandler(data.email, data.password);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 sm:p-12">
        <div className="w-full space-y-8">
          <HeaderAuth
            title={"Welcome Back"}
            subtitle={"Please enter your details to log in."}
          />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`relative block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className={`relative block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ${isSubmitting ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
              >
                <ButtonSvg />
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          <AuthLink
            text="Don't have an account?"
            linkText="Register"
            linkTo="/auth/register"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
