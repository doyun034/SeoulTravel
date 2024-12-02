import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const pwInputRef = useRef(null); // 비밀번호 입력 필드 ref
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3001/members");
      const user = response.data.find(
        (member) => member.memId === id && member.memPw === pw
      );

      if (user) {
        alert("로그인 성공!");
        localStorage.setItem("userId", user.memId); // 로컬 스토리지에 유저 아이디 저장
        window.location.href = "/";
      } else {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>로그인 화면</h1>
        <div className="loginContents">
          {/* 아이디 입력 */}
          <div className="inputWrap">
            <input
              name="item_id"
              id="item_id"
              type="text"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") pwInputRef.current.focus(); // 엔터 키로 비밀번호 필드로 이동
              }}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="inputWrap inputWithIcon">
            <input
              name="item_pw"
              id="item_pw"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-field"
              ref={pwInputRef} // ref 연결
              onKeyPress={(e) => {
                if (e.key === "Enter") handleLogin(); // 엔터 키로 로그인 실행
              }}
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button onClick={handleLogin}>로그인</button>
        <Link to="/seoultravel/signup" className="signup-button">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import '../../styles/Login.css';

// const Login = () => {
//   const [id, setId] = useState('');
//   const [pw, setPw] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/members');
//       const user = response.data.find(
//         (member) => member.memId === id && member.memPw === pw
//       );

//       if (user) {
//         alert("로그인 성공!");
//         localStorage.setItem('userId', user.memId); // 로컬 스토리지에 유저 아이디 저장
//         navigate('/'); // 로그인 성공 시 홈 페이지로 이동
//       } else {
//         alert("아이디 또는 비밀번호가 올바르지 않습니다.");
//       }
//     } catch (error) {
//       console.error("로그인 실패:", error);
//     }
//   };

//   // 비밀번호 보기 토글 함수
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="login-page">
//       <h1>로그인 화면</h1>
//       <div className="loginContents">
//         <div className="inputWrap">
//           <label htmlFor="item_id">아이디</label>
//           <input
//             name="item_id"
//             id="item_id"
//             type="text"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//         </div>
//         <div className="inputWrap">
//           <label htmlFor="item_pw">비밀번호</label>
//           <div className="password-field">
//             <input
//               name="item_pw"
//               id="item_pw"
//               type={showPassword ? "text" : "password"}
//               value={pw}
//               onChange={(e) => setPw(e.target.value)}
//             />
//             <span className="password-toggle" onClick={togglePasswordVisibility}>
//               {showPassword ? (
//                 // Eye-slash SVG icon for hiding password
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M17.94 17.94A10.922 10.922 0 0112 20a10.92 10.92 0 01-7.778-3.222A12.88 12.88 0 012 12c1.14-2.18 3.242-5.093 6.401-7.177l1.67 1.67A9.05 9.05 0 004 12a10.929 10.929 0 0011.778 7.778l1.67 1.67C18.094 21.22 15.142 22 12 22c-3.443 0-6.62-1.365-9.094-3.839A14.86 14.86 0 010 12a14.82 14.82 0 013.22-4.739l2.342 2.342A10.911 10.911 0 012 12c0 2.98 1.21 5.8 3.22 7.778A14.86 14.86 0 0012 24c3.443 0 6.62-1.365 9.094-3.839A14.82 14.82 0 0024 12c0-2.98-1.21-5.8-3.22-7.778L20 6.222A12.902 12.902 0 0124 12a12.881 12.881 0 01-4.222 7.778 14.822 14.822 0 01-1.838 1.84L18.001 18l1.939-1.939zM12 10a2 2 0 012 2c0 .687-.209 1.335-.562 1.87l1.415 1.414A3.989 3.989 0 0016 12a4 4 0 10-4 4 3.989 3.989 0 001.414-.586L12 16.586l1.414-1.415A2.001 2.001 0 0112 12a2 2 0 010-4z" />
//                 </svg>
//               ) : (
//                 // Eye SVG icon for showing password
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 4c-4.418 0-8.083 2.636-10.094 6C3.917 14.364 7.582 17 12 17s8.083-2.636 10.094-6C20.083 6.636 16.418 4 12 4zm0 11c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
//                 </svg>
//               )}
//             </span>
//           </div>
//         </div>
//       </div>
//       <button onClick={handleLogin}>로그인</button>
//       <Link to="/seoultravel/signup" className="signup-button">
//         회원가입
//       </Link>
//     </div>
//   );
// };

// export default Login;