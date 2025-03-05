import  { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Mainpage = lazy(() => import('./components/public/Mainpage.jsx'));
const Loginpage = lazy(() => import('./components/public/Loginpage.jsx'))
const Signuppage = lazy(() => import('./components/public/Signuppage.jsx'))
const Forgotpassword = lazy(() => import('./components/public/Forgotpassword.jsx'))
const Tripbooking = lazy(() => import('./components/public/Tripbooking.jsx'))
const TourCRUD = lazy(() => import('./components/public/TourCRUD.jsx'))
const HotelCRUD = lazy(() => import('./components/public/HotelCRUD.jsx'))
const Adminlogin = lazy(() => import('./components/public/Adminlogin.jsx'))
const AdmintourCRUD = lazy(() => import('./components/public/AdmintourCRUD.jsx'))
const AdminhotelCRUD = lazy(() => import('./components/public/AdminhotelCRUD.jsx'))


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/trip-booking' element={<Tripbooking />} />
          <Route path='/tour-crud' element={<TourCRUD />} />
          <Route path='/hotel-crud' element={<HotelCRUD />} />     
          <Route path='/adminlogin' element={<Adminlogin/>} />
          <Route path='/admintourcrud' element={<AdmintourCRUD/>} />
          <Route path='/adminhotelcrud' element={<AdminhotelCRUD/>} />
          
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App