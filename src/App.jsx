
import './App.css'
import Home from './Pages/Home/Home'
import RequireAuth from './Components/Others/RequireAuth/RequireAuth'
import NotFound from './Pages/NotFound/NotFound'
import CPanel from './Components/Dashboard/AdminDashboard/Admin/CPanel'
import AdDashboard from './Components/Dashboard/AdminDashboard/Dashboard/AdDashboard'
import ManageUsers from './Components/Dashboard/AdminDashboard/ManageUsers/ManageUsers'
import RequireAdmin from './Components/Others/RequireAdmin/RequireAdmin'
import Header from './Pages/Shared/Header/Header'
import Footer from './Pages/Shared/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Jobs from './Pages/Jobs/Jobs'
import Blogs from './Pages/Blogs/Blogs'
import ManageJobs from './Components/Dashboard/AdminDashboard/ManageJobs/ManageJobs'
import ManageJobApplications from './Components/Dashboard/AdminDashboard/ManageJobApplications/ManageJobApplications'
import SingleBlogDetails from './Components/Pages/Blogs/SingleBlogDetails'
import SingleJobDetails from './Components/Pages/Jobs/SingleJobDetails'
import ManageBlogs from './Components/Dashboard/AdminDashboard/ManageBlogs/ManageBlogs'
import AboutUS from './Pages/AboutUS/AboutUS'
import ContactUS from './Pages/ContactUS/ContactUS'
import Profile from './Components/Dashboard/UserDashboard/Profile/Profile'
import Signin from './Pages/Auth/Signin/Signin'
import Socializations from './Pages/Socializations/Socializations'
import ManageSocializations from './Components/Dashboard/AdminDashboard/ManageSocializations/ManageSocializations'
import SingleSocializationDetails from './Components/Pages/Socializations/SingleSocializationDetails'
import Signup from './Pages/Auth/Signup/Signup'

function App() {

  return (
    <>
      <div className="App pt-20">
        {(window.location.pathname !== '/cpanel' && window.location.pathname !== '/cpanel/addashboard' && window.location.pathname !== '/cpanel/mblogs' && window.location.pathname !== '/cpanel/mjobs' && window.location.pathname !== '/cpanel/msocializations' && window.location.pathname !== '/cpanel/mjobapplications') && <Header />}
        {/* <Header /> */}
        <div className="">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/jobs/:id' element={<RequireAuth><SingleJobDetails /></RequireAuth>} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:id' element={<RequireAuth><SingleBlogDetails /></RequireAuth>} />
            <Route path='/socializations' element={<Socializations />} />
            <Route path='/socializations/:id' element={<RequireAuth><SingleSocializationDetails /></RequireAuth>} />
            <Route path='/aboutus' element={<AboutUS />} />
            <Route path='/contactus' element={<ContactUS />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />


            {/* Control Panel Routes */}
            <Route path="/cpanel" element={<RequireAuth><RequireAdmin><CPanel /></RequireAdmin></RequireAuth>}>
              <Route index element={<AdDashboard />} />
              <Route path="addashboard" element={<AdDashboard />} />
              <Route path="musers" element={<ManageUsers />} />
              <Route path="mjobs" element={<ManageJobs />} />
              <Route path="mblogs" element={<ManageBlogs />} />
              <Route path="msocializations" element={<ManageSocializations />} />
              <Route path="mjobapplications" element={<ManageJobApplications />} />
            </Route>
          </Routes>
        </div>
        {(window.location.pathname !== '/cpanel' && window.location.pathname !== '/cpanel/addashboard' && window.location.pathname !== '/cpanel/mblogs' && window.location.pathname !== '/cpanel/mjobs' && window.location.pathname !== '/cpanel/msocializations' && window.location.pathname !== '/cpanel/mjobapplications') && <Footer />}
        <ToastContainer />
      </div>
    </>
  )
}

export default App
