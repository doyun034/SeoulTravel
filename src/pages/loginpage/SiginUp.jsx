import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    const name = nameRef.current.value;
    const id = idRef.current.value;
    const pw = pwRef.current.value;

    if (!name || !id || !pw) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (window.confirm("회원가입 하시겠습니까?")) {
      try {
        await axios.post('http://localhost:3001/members', {
          memName: name,
          memId: id,
          memPw: pw,
        });
        alert("회원가입이 완료되었습니다!");
        navigate('/seoultravel/login');
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입 중 문제가 발생했습니다.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page">
      <h1>회원가입 화면</h1>
      <div className="loginContents">
        <div className="inputWrap">
          <label htmlFor="item_name">이름</label>
          <input name="item_name" ref={nameRef} id="item_name" type="text" />
        </div>
        <div className="inputWrap">
          <label htmlFor="item_id">아이디</label>
          <input name="item_id" ref={idRef} id="item_id" type="text" />
        </div>
        <div className="inputWrap">
          <label htmlFor="item_pw">비밀번호</label>
          <div className="password-field">
            <input
              name="item_pw"
              ref={pwRef}
              id="item_pw"
              type={showPassword ? "text" : "password"}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.922 10.922 0 0112 20a10.92 10.92 0 01-7.778-3.222A12.88 12.88 0 012 12c1.14-2.18 3.242-5.093 6.401-7.177l1.67 1.67A9.05 9.05 0 004 12a10.929 10.929 0 0011.778 7.778l1.67 1.67C18.094 21.22 15.142 22 12 22c-3.443 0-6.62-1.365-9.094-3.839A14.86 14.86 0 010 12a14.82 14.82 0 013.22-4.739l2.342 2.342A10.911 10.911 0 012 12c0 2.98 1.21 5.8 3.22 7.778A14.86 14.86 0 0012 24c3.443 0 6.62-1.365 9.094-3.839A14.82 14.82 0 0024 12c0-2.98-1.21-5.8-3.22-7.778L20 6.222A12.902 12.902 0 0124 12a12.881 12.881 0 01-4.222 7.778 14.822 14.822 0 01-1.838 1.84L18.001 18l1.939-1.939zM12 10a2 2 0 012 2c0 .687-.209 1.335-.562 1.87l1.415 1.414A3.989 3.989 0 0016 12a4 4 0 10-4 4 3.989 3.989 0 001.414-.586L12 16.586l1.414-1.415A2.001 2.001 0 0112 12a2 2 0 010-4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4c-4.418 0-8.083 2.636-10.094 6C3.917 14.364 7.582 17 12 17s8.083-2.636 10.094-6C20.083 6.636 16.418 4 12 4zm0 11c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                </svg>
              )}
            </span>
          </div>
        </div>
      </div>
      <button className="signup" onClick={onSubmit}>회원가입</button>
    </div>
  );
};

export default SignUp;


// import React from 'react';
// import '../../styles/SignUp.css';

// const SignUp = () => {
//   return (
//     <div className="main-page">
//       <h1>회원가입 화면</h1>
//     </div>
//   );
// };

// export default SignUp;
