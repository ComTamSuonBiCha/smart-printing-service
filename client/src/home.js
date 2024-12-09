import React from "react";
import HomeloginHeader from "./homeloginHeader";
import sectionStyles from "./home.module.css";
import logo from "./component/BachKhoaLogo.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  return (
    <div className="container">
      <div className={sectionStyles.hero_content}>
        <h1 className={sectionStyles.hero_title}>
          HCMUT Student Printing Service System
        </h1>
        <p className={sectionStyles.hero_subtitle}>
          A place to print your document
        </p>
        <button className={sectionStyles.learn_more_btn}>LEARN MORE</button>
      </div>
      <div className={sectionStyles.hero_background}>
        <div className={sectionStyles.wave1}></div>
        <div className={sectionStyles.wave2}></div>
      </div>
    </div>
  );
}

export default HeroSection;
