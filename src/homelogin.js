import React, { useState } from "react";
import loginStyles from "./homelogin.module.css";
import background from "./component/bgbk.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSPSO, setIsSPSO] = useState(true);
  const handleClick = (isSPSO) => {
    navigate("/login", { state: { isSPSO } });
  };
  return (
    <div className={loginStyles.login_page}>
      <div className={loginStyles.login_content}>
        <div className={loginStyles.login_left}>
          <h1>Welcome Back!</h1>
          <p>Login your account on:</p>
          <button
            onClick={() => handleClick(false)}
            className={loginStyles.btn}
          >
            Student/Lecturer
          </button>
          <button onClick={() => handleClick(true)} className={loginStyles.btn}>
            Student Printing System Officer
          </button>
        </div>

        <div className={loginStyles.login_right}>
          <img
            src={background}
            alt="Bach Khoa university"
            className={loginStyles.right_image}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
