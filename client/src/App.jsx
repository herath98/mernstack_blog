import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SingIn from './pages/SingIn'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import CreateProject from './pages/CreateProject'
import ProjectPage from './pages/ProjectPage'
import SearchProject from './pages/SearchProject'

function App() {


  return (
    <BrowserRouter>
     <ScrollToTop />
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/search' element={<Search />} />
        <Route path='/searchproject' element={<SearchProject />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='project' element={<Project />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/project/:projectSlug' element={<ProjectPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
