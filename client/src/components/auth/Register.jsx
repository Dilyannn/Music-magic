import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUserContext } from '../../hooks/useUserContext';

import HeaderAuth from './others/HeaderAuth.jsx';
import ButtonSvg from './others/ButtonSvg.jsx';
import AuthLink from './others/AuthLink.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { registerHandler } = useUserContext();
  
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerHandler(data.email, data.password);
      toast.success("Account created successfully!");
      navigate('/');
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "Failed to register");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
        
      <div className="w-full max-w-md p-8 sm:p-12">
        <div className="w-full space-y-8">

          <HeaderAuth title={'Create Account'} subtitle={'Please enter your details to register.'} />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
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
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className={`relative block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (validation) => {
                      if (getValues("password") != validation) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  className={`relative block w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ${isSubmitting ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
              >
                <ButtonSvg />
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <AuthLink 
            text="Already have an account?" 
            linkText="Log In" 
            linkTo="/auth/login" 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;