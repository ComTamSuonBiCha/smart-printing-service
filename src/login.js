import React from "react";
import loginStyles from "./login.module.css";
import illustration from "./component/image1.png"; // Add your illustration image to this path

function Login() {
  return (
    <div className="Container">
      <div className={loginStyles.MainContent}>
        <div className={loginStyles.IllustrationSection}>
          <img
            src={illustration}
            alt="Illustration"
            className={loginStyles.IllustrationImage}
          />
        </div>

        <div className={loginStyles.LoginForm}>
          <h2 className={loginStyles.LoginHeader}>Login Account</h2>
          <form>
            <div className={loginStyles.FormGroup}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className={loginStyles.FormGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className={loginStyles.FormOptions}>
              <label>
                <input type="checkbox" /> Remember your account
              </label>
              <a href="#" className={loginStyles.ForgotPassword}>
                Forgot your password ?
              </a>
            </div>
            <button type="submit" className={loginStyles.LoginButton}>
              <b>LOG IN</b>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
