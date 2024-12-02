import React from 'react';
import HomeloginHeader from './homeloginHeader';
import loginStyles from './homelogin.module.css';
import logo from './component/BachKhoaLogo.png';
import background from './component/bgbk.png';

const LoginPage = () => {
  return (
    <div className={loginStyles.login_page}>
      <HomeloginHeader logo = {logo}/>

      <div className={loginStyles.login_content}>
        <div className={loginStyles.login_left}>
          <h1>Welcome Back!</h1>
          <p>Login your account on:</p>
          <button className={loginStyles.btn}>Student/Lecturer</button>
          <button className={loginStyles.btn}>Student Printing System Officer</button>
        </div>
        <div className={loginStyles.login_right}>
          <img src={background} alt="Back Khoa university" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;