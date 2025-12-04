import { useContext } from "react";
import { useNavigate } from "react-router";

import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import HeaderAuth from "./others/HeaderAuth.jsx";
import ButtonSvg from "./others/ButtonSvg.jsx";
import AuthLink from "./others/AuthLink.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { loginHandler } = useContext(UserContext);

  const { values, changeHandler, formAction } = useForm(
    async ({ email, password }) => {
      try {
        await loginHandler(email, password);
        navigate("/");
      } catch (err) {
        console.error(err.message);
      }
    },
    {
      email: "",
      password: "",
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    formAction();
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 sm:p-12">
        <div className="w-full space-y-8">
          <HeaderAuth
            title={"Welcome Back"}
            subtitle={"Please enter your details to log in."}
          />

          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={changeHandler}
                  className="relative block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={values.password}
                  onChange={changeHandler}
                  className="relative block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              >
                <ButtonSvg />
                Log In
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
