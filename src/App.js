import { Routes, Route } from 'react-router-dom';
import React from "react";

import MainHome from './pages/mainpage/MainHome';
import SeoulMap from './pages/seoulmap/SeoulMap';
import RandomStation from './pages/randomstationpage/RandomStation';
import Login from './pages/loginpage/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/seoultravel/seoulmap" element={<SeoulMap />} />
        <Route path="/seoultravel/random/station" element={<RandomStation />} />
        <Route path="/seoultravel/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;