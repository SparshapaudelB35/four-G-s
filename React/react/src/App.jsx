import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Mainpage = lazy(() => import('./components/public/Mainpage.jsx'));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Mainpage/>} />              
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App