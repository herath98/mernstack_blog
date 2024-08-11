import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { set } from "mongoose";

export default function SignUp() {
  // State hooks for form data, error message, success message, and loading state
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Navigation hook for redirecting to login page
  const navigate = useNavigate();

  // Event handler for form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    }); 
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (formData.email === formData.password) {
      setErrorMessage('Email and password cannot be the same');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      // Make API request to sign up user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Parse the response body as JSON
      const data = await res.json();
      
      // Check if the sign up was successful
      if (data.success === false) {
        // If not, set the error message from the response
        return setErrorMessage(data.message);
      }

      // If the sign up was successful, set the success message
      setLoading(false);

      // Redirect to login page on successful sign up
      if (res.ok) {
        setSuccessMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/sign-in');
        }, 1000);
        return;
      }
      // Redirect user to another page on successful signup
      // Example: history.push('/login');
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    }
  };

  return (
    // Main container
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            {/* Logo */}
            <Link to="/" className="text-5xl font-bold dark:text-white ">
              <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
              Blog
            </Link>
            {/* Description */}
            <p className="justify-center text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Success message */}
            {successMessage &&
              <Alert className="mt-4" color="success">
                {successMessage}
              </Alert>
            }
            {/* Form fields */}
            <div className="">
              <div className="w-full">
                <Label value="Your Username" />
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-1">
                <Label value="Your Email" />
                <TextInput id="email" name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </div>
              <div className="w-full mt-1">
                <Label value="Your Password" />
                <TextInput id="password" name="password" type="password" placeholder="password" onChange={handleChange} />
              </div>
              {/* Submit button */}
              <Button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      size="sm"
                      aria-label="Extra large spinner example"
                    />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'}
              </Button>
            </div>
            {/* Social media login options */}
            <OAuth/>
          </form>
          {/* Link to login page */}
          <div>
            <p className="text-sm mt-4">Already have an account?
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
          {/* Error message */}
          {errorMessage &&
            <Alert className="mt-4" color="failure">
              {errorMessage}
            </Alert>
          }
        </div>
      </div>
    </div>
  );
}
