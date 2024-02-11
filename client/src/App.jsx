import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SingIn from './pages/SingIn'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Header from './components/Header'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SingIn />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='project' element={<Project />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
