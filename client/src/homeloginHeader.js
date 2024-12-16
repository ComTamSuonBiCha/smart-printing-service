import React from "react";
import logo from './component/BachKhoaLogo.png';
import headerStyles from "./headerlogin.module.css";

const Header = () => {
  return (
    <div className="container">
    <header className={headerStyles.header}>
      <div className={headerStyles.logo_container}>
        <img src={logo} alt="HCMUT SPSS Logo" className={headerStyles.logo} />
        <div className={headerStyles.logo_text}>
          <span className={headerStyles.logo_line}>HCMUT</span>
          <span className={headerStyles.logo_line}>SPSS</span>
        </div>
      </div>
      <div className={headerStyles.header_right}>
        <span className={headerStyles.user_name}>ABOUT US</span>
        <button className={headerStyles.logout_button}>LOG IN</button>
      </div>
    </header>
    </div>
  );
};

export default Header;
