import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import myprofile from '../assets/myp.png'
import { FaLinkedin, FaGithubSquare, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import VideoPopup from "../components/VideoPopup";
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [project,setProject] = useState([]);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    const fetchProject = async () => {
      const res = await fetch('/api/project/getprojectrecent');
      const data = await res.json();
      setProject(data.project);
    
    };
    fetchPosts();
    fetchProject();
  }, []);
  const handleVideoClick = () => {
    setShowPopup(true);
  };
  const handleDownloadCV = () => {
    // Trigger the download of the CV
    const link = document.createElement("a");
    link.href = "/Harsha_CV.pdf"; // The path to your CV in the public folder
    link.download = "Harsha_CV.pdf"; // Optional: specify the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div className=" bg-gradient-to-b from-blue-900 to-transparent flex items-center justify-center">
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-violet-800 p-8 rounded-xl shadow-lg w-11/12  mb-5 text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="bg-cyan-900 md:col-span-4 justify-items-center text-center xl:col-span-3 p-6 rounded-lg mb-8 md:mb-0">
              <img
                src={myprofile} // Replace with actual image URL
                alt="Profile"
                className="rounded-full w-32 h-32 mx-auto jud  mb-4"
              />
              <h2 className="text-2xl font-bold">Harsha Udayanga</h2>
              <p className="mt-2">I’m Full Stack Developer</p>
              <div className="mt-4">
                <div className="flex justify-center space-x-4">
                  <a href="www.linkedin.com/in/harsha-udayanga-herath-773a07224" className="">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/herath98" className="">
                    <FaGithubSquare />
                  </a>
                  <a href="mailto:harshaudayanga401@gmail.com" className="">
                    <MdEmail />
                  </a>
                </div>
                <div className="mt-4">
                  <p>
                    Residence: Sri Lanka
                    </p>
                  <p>City: Nugegoda</p>
                  <p>Age: 26</p>
                </div>
                <button onClick={handleDownloadCV} className="mt-4 bg-white text-black hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... px-4 py-2 rounded-lg">
                  Contact
                </button>
              </div>
            </div>
            <div className="md:ml-8 md:col-span-8 xl:col-span-9">
              <h1 className="text-2xl md:text-4xl xl:text-8xl w-10/12  font-bold mb-4"><span className='bg-gradient-to-r from-lime-500 via-cyan-500 to-violet-800 rounded-xl px-2 '> Stars</span>Blog Welcome to the My Personal Blog </h1>
              <button onClick={handleVideoClick} className=" bg-cyan-900 text-white px-6 py-3 rounded-lg font-bold mb-6 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                Video Resume
              </button>
              <div className="flex flex-col md:flex-row md:mb-[-300px] xl:mb-[-120px] gap-5 md:space-x-1 xl:space-x-8 ">
                <div className='bg-cyan-900 text-center w-[300px] p-4 lg:p-8 rounded-xl '>
                  <h3 className="text-2xl font-bold">25+</h3>
                  <p>Completed Projects</p>
                  <Link to='/project' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View All Projects</Link>
                </div>
                <div className='bg-cyan-900 text-center p-4 w-[300px] lg:p-8 rounded-xl '>
                  <h3 className="text-2xl font-bold">50 +</h3>
                  <p>Blog Post</p>
                  <Link  to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View All Post</Link>
                </div>
                <div className='bg-cyan-900 text-center p-4 w-[300px] lg:p-8 rounded-xl '>
                  <h3 className="text-2xl font-bold">14 +</h3>
                  <p>Blog Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup && (
          <VideoPopup close={() => setShowPopup(false)} videoID="https://firebasestorage.googleapis.com/v0/b/star-blog-3d0dd.appspot.com/o/invideo-ai-480%20From%20Aspiring%20Developer%20to%20Full-Stack%20Pr%202024-08-10%20(1).mp4?alt=media&token=cda989d6-9c25-4450-94b0-9c55fc00045d" />
        )}
      </div>
     

      <div className='max-w-7xl mx-auto p-3 flex md:mt-20 flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
      <div className='max-w-7xl mx-auto p-3 flex md:mt-20 flex-col gap-8 py-7'>
        {project && project.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4'>
              {project.map((post) => (
                <ProjectCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}