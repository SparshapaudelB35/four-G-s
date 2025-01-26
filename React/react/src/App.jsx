import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Mainpage = lazy(() => import('./components/public/Mainpage.jsx'));
const Loginpage = lazy(() => import('./components/public/Loginpage.jsx'))
const Signuppage = lazy(() => import('./components/public/Signuppage.jsx'))
const Forgotpassword = lazy(() => import('./components/public/Forgotpassword.jsx'))


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Forgotpassword/>}/>
        {/* <Route path='/' element={<Signuppage/>}/> */}
        {/* <Route path='/' element={<Mainpage/>} />  */}
        {/* <Route path='/' element={<Loginpage/>} /> */}
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App