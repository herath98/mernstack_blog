import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); // Corrected variable name
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) { // Removed formData.username check
      setErrorMessage('Please fill in all fields');
      return;
    }
    // Check if email and password are the same
    if (formData.email === formData.password) {
      setErrorMessage('Email and password cannot be the same');
      return;
    }

    // Add form validation here if needed

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSuccessMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/');
        }, 1000); // Adjust the timeout as needed
        return;
      } else {
        setErrorMessage(data.message || 'Sign in failed'); // Set error message from response data if available
      }

      // Redirect user to another page on successful signup
      // Example: history.push('/login');
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
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
          </form>
          <div>
            <p className="text-sm mt-4">Don't have an account?
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
          {errorMessage && // Corrected variable name
            <Alert className="mt-4" color="failure">
              {errorMessage} {/* Corrected variable name */}
            </Alert>
          }
        </div>
      </div>
    </div>
  );
}
