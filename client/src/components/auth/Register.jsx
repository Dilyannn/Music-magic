import { useState } from 'react';
import { useNavigate } from 'react-router';

import HeaderAuth from './others/HeaderAuth.jsx';
import ButtonSvg from './others/ButtonSvg.jsx';
import AuthLink from './others/AuthLink.jsx';

const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChangeHandler = (e) => {
    setFormValues(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      localStorage.setItem('accessToken', result.accessToken);
      navigate('/');

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white">
        
      <div className="w-full max-w-md p-8 sm:p-12">
        <div className="w-full space-y-8">

          <HeaderAuth title={'Create Account'} subtitle={'Please enter your details to register.'} />

          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formValues.email}
                  onChange={onChangeHandler}
                  className="relative block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formValues.password}
                  onChange={onChangeHandler}
                  className="relative block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formValues.confirmPassword}
                  onChange={onChangeHandler}
                  className="relative block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              >
                <ButtonSvg />
                Register
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