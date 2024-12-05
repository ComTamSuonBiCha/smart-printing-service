import React from "react";
import headerStyles from "./header.module.css";
import logo from "./component/BachKhoaLogo.png";

const Header = (props) => {
  return (
    <>
      {props.isLogin ? (
        <div className={headerStyles.container}>
          <div className={headerStyles.dashboard}>
            <header className={headerStyles.header}>
              <div className={headerStyles.logo_container}>
                <img
                  src={logo}
                  alt="HCMUT SPSS Logo"
                  className={headerStyles.logo}
                />
                <div className={headerStyles.logo_text}>
                  <span className={headerStyles.logo_line}>HCMUT</span>
                  <span className={headerStyles.logo_line}>SPSS</span>
                </div>
              </div>
              <nav className={headerStyles.header_nav}>
                <a href="/" className={headerStyles.nav_link}>
                  HOME
                </a>
                <a href="/print" className={headerStyles.nav_link}>
                  PRINT
                </a>
                <a href="#payment" className={headerStyles.nav_link}>
                  PAYMENT
                </a>
                <a href="/history" className={headerStyles.nav_link}>
                  HISTORY
                </a>
              </nav>
              <div className={headerStyles.header_right}>
                <div className={headerStyles.avatar}></div>
                <span className={headerStyles.user_name}>
                  LE THI PHUONG THAO
                </span>
                <button className={headerStyles.logout_button}>LOG OUT</button>
              </div>
            </header>
          </div>
        </div>
      ) : (
        <header className={headerStyles.header}>
          <div className={headerStyles.logo_container}>
            <img
              src={logo}
              alt="HCMUT SPSS Logo"
              className={headerStyles.logo}
            />
            <div className={headerStyles.logo_text}>
              <span className={headerStyles.logo_line}>HCMUT</span>
              <span className={headerStyles.logo_line}>SPSS</span>
            </div>
          </div>
          <div className={headerStyles.header_right}>
            <span className={headerStyles.user_name}>CANCEL</span>
            <button className={headerStyles.logout_button}>LOG OUT</button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
