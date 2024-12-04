import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoHome, IoSearch } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GiTreasureMap } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import '../styles/Header.css';

import logo from '../assets/images/mainlogo.png';

const Header = () => {
  const [homeLink, setHomeLink] = useState('/');

  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-text">그리다,</span>
        <img src={logo} alt="로고" className="logo" />
        <span className="logo-text">서울</span>
      </div>
      <nav className="nav-links">
        <Link className="nav-link home" to={homeLink}><IoHome className="icon" />홈</Link>
        <Link className="nav-link" to="/seoultravel/seoulmap"><GiTreasureMap className="icon" />서울맵</Link>
        <Link className="nav-link" to="/seoultravel/edit/map"><GiTreasureMap className="icon" />맵 편집</Link>
        <Link className="nav-link" to="/seoultravel/random/station"><GiPerspectiveDiceSixFacesRandom className="icon" />랜덤 역</Link>
        <Link className="nav-link" to="/seoultravel/station/memo"><GiPerspectiveDiceSixFacesRandom className="icon" />역 메모장</Link>
        <Link className="nav-link login-link" to="/seoultravel/login"><CiLogin className="icon" />로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
