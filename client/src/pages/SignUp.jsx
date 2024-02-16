import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        {/* left */}
        <div className="w-full md:w-1/2 p-4"> {/* Divide the container equally for small screens and half for larger screens */}
          <div className="">
            <Link to="/" className="text-2xl font-bold dark:text-white ">
              <span className="px-2 py-1 bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-lg text-white">Stars</span>
              Blog
            </Link>
            <p className="text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 p-4"> {/* Divide the container equally for small screens and half for larger screens */}
          <form className="flex flex-col gap-4">
            <div className="">
              <div className="w-full">
                <Label htmlFor="username" value="Your  Username" />
                <TextInput id="username" type="text" placeholder="username" required />
              </div>
              <div className="w-full mt-1">
                <Label htmlFor="email" value="Your email" />
                <TextInput id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="w-full mt-1">
                <Label htmlFor="password" value="Your password" />
                <TextInput id="password" type="password" placeholder="password" required />
              </div>
              <Button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
          <div>
            <p className="text-sm mt-4">Already have an account?
              <Link to="/sign-in" className="text-blue-500">
                Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
