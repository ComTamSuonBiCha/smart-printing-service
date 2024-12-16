import React from "react";
import loginStyles from "./loginHeader.module.css";
import logo from "./component/BachKhoaLogo.png";

const Header = (props) => {
  return (
    <div className="container">
      <header className={loginStyles.header}>
        <div className={loginStyles.logo_container}>
          <img src={logo} alt="HCMUT SPSS Logo" className={loginStyles.logo} />
          <div className={loginStyles.logo_text}>
            <span className={loginStyles.logo_line}>HCMUT</span>
            <span className={loginStyles.logo_line}>SPSS</span>
          </div>
        </div>
        <nav className={loginStyles.header_nav}>
          <a href="#home" className={loginStyles.nav_link}>
            HOME
          </a>
          <a href="#print" className={loginStyles.nav_link}>
            PRINT
          </a>
          <a href="#payment" className={loginStyles.nav_link}>
            PAYMENT
          </a>
          <a href="#history" className={loginStyles.nav_link}>
            HISTORY
          </a>
        </nav>
        <div className={loginStyles.header_right}>
          <div className={loginStyles.avatar}></div>
          <span className={loginStyles.user_name}>{props.name}</span>
          <button className={loginStyles.logout_button}>LOG OUT</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
