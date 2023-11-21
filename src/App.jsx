
import './App.css'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import RequireAuth from './Components/Others/RequireAuth/RequireAuth'
import Signin from './Pages/Auth/Signin/Signin'
import Signup from './Pages/Auth/Signup/Signup'
import NotFound from './Pages/NotFound/NotFound'
import Profile from './Components/Dashboard/UserDashboard/Profile/Profile'
import CPanel from './Components/Dashboard/AdminDashboard/Admin/CPanel'
import AdDashboard from './Components/Dashboard/AdminDashboard/Dashboard/AdDashboard'
import ManageUsers from './Components/Dashboard/AdminDashboard/ManageUsers/ManageUsers'
import RequireAdmin from './Components/Others/RequireAdmin/RequireAdmin'
import Header from './Pages/Shared/Header/Header'
import Footer from './Pages/Shared/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Jobs from './pages/Jobs/Jobs'
import Blogs from './Pages/Blogs/Blogs'
import Stafs from './Pages/Stafs/Stafs'
import ManageJobs from './Components/Dashboard/AdminDashboard/ManageServices/ManageJobs'
import ManageStafs from './Components/Dashboard/AdminDashboard/ManageStafs/ManageStafs'
import SingleBlogDetails from './Components/Pages/Blogs/SingleBlogDetails'
import SingleJobDetails from './Components/Pages/Jobs/SingleJobDetails'
import Success from './Components/Others/Success/Success'
import Checkout from './Components/Pages/Checkout/Checkout'
import ManageBookings from './Components/Dashboard/AdminDashboard/ManageBookings/ManageBookings'
import ManageOrders from './Components/Dashboard/AdminDashboard/ManageOrders/ManageOrders'
import ManageBlogs from './Components/Dashboard/AdminDashboard/ManageParts/ManageBlogs'
import AboutUS from './Pages/AboutUS/AboutUS'
import ContactUS from './Pages/ContactUS/ContactUS'

function App() {

  return (
    <>
      <div className="App pt-20">
        {(window.location.pathname !== '/cpanel' && window.location.pathname !== '/cpanel/addashboard' && window.location.pathname !== '/cpanel/musers' && window.location.pathname !== '/cpanel/mblogs' && window.location.pathname !== '/cpanel/mjobs' && window.location.pathname !== '/cpanel/mstafs' && window.location.pathname !== '/cpanel/addparts' && window.location.pathname !== '/cpanel/addservice' && window.location.pathname !== '/cpanel/addstaf' && window.location.pathname !== '/cpanel/mbookings' && window.location.pathname !== '/cpanel/morders') && <Header />}
        {/* <Header /> */}
        <div className="">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/jobs/:id' element={<RequireAuth><SingleJobDetails /></RequireAuth>} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:id' element={<RequireAuth><SingleBlogDetails /></RequireAuth>} />
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
              <Route path="mjobapplications" element={<ManageStafs />} />
              <Route path="mbloods" element={<ManageOrders />} />
              <Route path="mvolunteers" element={<ManageBookings />} />
            </Route>
          </Routes>
        </div>
        {(window.location.pathname !== '/cart' && window.location.pathname !== '/cpanel' && window.location.pathname !== '/cpanel/addashboard' && window.location.pathname !== '/cpanel/mblogs' && window.location.pathname !== '/cpanel/mjobs' && window.location.pathname !== '/cpanel/mservices' && window.location.pathname !== '/cpanel/mstafs' && window.location.pathname !== '/cpanel/addparts' && window.location.pathname !== '/cpanel/addservice' && window.location.pathname !== '/cpanel/addstaf' && window.location.pathname !== '/cpanel/mbookings' && window.location.pathname !== '/cpanel/morders') && <Footer />}
        <ToastContainer />
      </div>
    </>
  )
}

export default App
