import React from "react";
import lhstyles from './lheader.module.css';
import logo from './component/BachKhoaLogo.png';

const Header = () => {
  return (
    <div className="container">
    <header className={lhstyles.header}>
      <div className={lhstyles.logo_container}>
        <img src={logo} alt="HCMUT SPSS Logo" className={lhstyles.logo} />
        <div className={lhstyles.logo_text}>
          <span className={lhstyles.logo_line}>HCMUT</span>
          <span className={lhstyles.logo_line}>SPSS</span>
        </div>
      </div>
      <div className={lhstyles.header_right}>
        <div className={lhstyles.avatar}></div>
        <span className={lhstyles.user_name}>ABOUT US</span>
        <button className={lhstyles.logout_button}>CANCEL</button>
      </div>
    </header>
    </div>
  );
};

export default Header;
