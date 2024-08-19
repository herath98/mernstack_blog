import { Alert, Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { set } from "mongoose";

export default function SignUp() {
  // State hook to store form data
  const [formData, setFormData] = useState({});
  // State hook to store error message
  const [errorMessage, setErrorMessage] = useState(null);
  // State hook to store success message
  const [successMessage, setSuccessMessage] = useState(null);
  // State hook to store loading state
  const [loading, setLoading] = useState(false);
  // Hook to navigate to different routes
  const navigate = useNavigate();

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };
  
  

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  /**
   * Handles form input change event
   * @param {Event} e - The event object
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  /**
   * Validates the password
   * @param {string} password - The password to validate
   * @returns {boolean} - True if the password is valid, false otherwise
   */
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasMoreThanTwoNumbers = /\d{3,}/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUppercase && hasMoreThanTwoNumbers && hasSymbol;
  };

  /**
   * Handles form submission
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if email and password are the same
    if (formData.email === formData.password) {
      setErrorMessage('Email and password cannot be the same');
      return;
    }

    // Validate the password
    if (!validatePassword(formData.password)) {
      setErrorMessage('Password must contain at least one uppercase letter, more than two numbers, and at least one symbol.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      // Send a POST request to the signup API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check if the signup was successful
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      // Redirect to login page if signup was successful
      if (res.ok) {
        setSuccessMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/sign-in');
        }, 1000);
        return;
      }
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
              Blog
            </Link>
            <p className="justify-center text-sm mt-4">
              The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {successMessage && (
              <Alert className="mt-4" color="success">
                {successMessage}
              </Alert>
            )}
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
              <div className="relative w-full mt-1">
                <Label value="Your Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleMouseEnter}

                />
                {isTooltipVisible && (
                  <Card className="absolute z-10 w-64 md:w-72  rounded-lg shadow-lg">
                    <div>Must have at least 6 characters</div>
                    <div>It's better to have:</div>
                    <ul className="list-disc ml-4">
                      <li>Upper & lower case letters</li>
                      <li>A symbol (#$&)</li>
                      <li>A longer password (min. 12 chars.)</li>
                    </ul>
                  </Card>
                )}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... " type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" aria-label="Loading spinner" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'}
              </Button>
            </div>
            <OAuth />
          </form>
          <div>
            <p className="text-sm mt-4">
              Already have an account? <Link to="/sign-in" className="text-blue-500">Sign In</Link>
            </p>
          </div>
          {errorMessage && (
            <Alert className="mt-4" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
