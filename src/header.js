import React from "react";
import headerStyles from "./header.module.css";
import logo from "./component/BachKhoaLogo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  console.log("Header rendered with isLogin:", props.isLogin);

  return (
    <>
      {props.isLogin ? (
        <div className={headerStyles.container}>
          <div className={headerStyles.dashboard}>
            <header className={headerStyles.header}>
              <div className={headerStyles.logo_container}>
                <a href="/main">
                  <img
                    src={logo}
                    alt="HCMUT SPSS Logo"
                    className={headerStyles.logo}
                  />
                </a>
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
                <a href="/" className={headerStyles.nav_link}>
                  PAYMENT
                </a>
                <a href="/student" className={headerStyles.nav_link}>
                  HISTORY
                </a>
              </nav>
              <div className={headerStyles.header_right}>
                <div className={headerStyles.avatar}></div>
                <span className={headerStyles.user_name}>
                  LE THI PHUONG THAO
                </span>
                <button
                  onClick={() => props.setLogin(false)}
                  className={headerStyles.logout_button}
                >
                  LOG OUT
                </button>
              </div>
            </header>
          </div>
        </div>
      ) : (
        <header className={headerStyles.header}>
          <div className={headerStyles.logo_container}>
            <a href="/main">
              <img
                src={logo}
                alt="HCMUT SPSS Logo"
                className={headerStyles.logo}
              />
            </a>
            <div className={headerStyles.logo_text}>
              <span className={headerStyles.logo_line}>HCMUT</span>
              <span className={headerStyles.logo_line}>SPSS</span>
            </div>
          </div>

          <div className={headerStyles.header_right}>
            <span className={headerStyles.user_name}>CANCEL</span>
            <button
              onClick={() => navigate("/loginpage")}
              className={headerStyles.logout_button}
            >
              LOG IN
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
