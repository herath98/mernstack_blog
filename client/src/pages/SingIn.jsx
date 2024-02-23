// SignIn.js
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import Oauth from '../components/OAuth.jsx';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Please fill in all fields'));
      return;
    }
    if (formData.email === formData.password) {
      dispatch(signInFailure('Email and password cannot be the same'));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess('Sign in successful! Redirecting to the homepage...'));
        setTimeout(() => {
          dispatch(signInSuccess(null));
          navigate('/');
        }, 1000);
        return;
      } else {
        dispatch(signInFailure(data.message || 'Sign in failed'));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white ">
              <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
              Blog
            </Link>
            <p className="justify-center text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {successMessage &&
              <Alert className="mt-4" color="success">
                {successMessage}
              </Alert>
            }
            <div className="">
              <div className="w-full mt-1">
                <Label value="Your Email" />
                <TextInput id="email" name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </div>
              <div className="w-full mt-1">
                <Label value="Your Password" />
                <TextInput id="password" name="password" type="password" placeholder="*******************" onChange={handleChange} />
              </div>
              <Button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      size="sm"
                      aria-label="Extra large spinner example"
                    />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'}
              </Button>
            </div>
            <Oauth/>
          </form>
          <div>
            <p className="text-sm mt-4">Don't have an account?
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
          {error &&
            <Alert className="mt-4" color="failure">
              {error}
            </Alert>
          }
        </div>
      </div>
    </div>
  );
}
