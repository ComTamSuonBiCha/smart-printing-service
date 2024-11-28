import React from 'react';
import loginStyles from './login.module.css';
import logo from './component/BachKhoaLogo.png'; // Ensure the logo image exists in this path
import illustration from './component/image1.png'; // Add your illustration image to this path

function Login() {
  return (
    <div className="Container">
      {/* <Header logo={logo}/> */}
      <header className={loginStyles.header}>
      <div className={loginStyles.logo_container}>
        <img src={logo} alt="HCMUT SPSS Logo" className={loginStyles.logo} />
        <div className={loginStyles.logo_text}>
          <span className={loginStyles.logo_line}>HCMUT</span>
          <span className={loginStyles.logo_line}>SPSS</span>
        </div>
      </div>

      <div className={loginStyles.header_right}>
        <span className={loginStyles.user_name}>CANCEL</span>
        <button className={loginStyles.logout_button}>LOG OUT</button>
      </div>
    </header>

      {/* Main Content */}
      <div className={loginStyles.MainContent}>
        {/* Image */}
        <div className={loginStyles.IllustrationSection}>
          <img src={illustration} alt="Illustration" className={loginStyles.IllustrationImage} />
        </div>

        {/* Login Form */}
        <div className={loginStyles.LoginForm}>
          <h2 className={loginStyles.LoginHeader}>Login Account</h2>
          <form>
            <div className={loginStyles.FormGroup}>
              <label htmlFor="username" >Username</label>
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
              <a href="#" className={loginStyles.ForgotPassword}>Forgot your password ?</a>
            </div>
            <button type="submit" className={loginStyles.LoginButton}><b>LOG IN</b></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
