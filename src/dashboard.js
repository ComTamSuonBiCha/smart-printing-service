import React from "react";
import Header from "./header";
import logo from './component/BachKhoaLogo.png';
import user from './component/user.png';
import book from './component/Book.png';
import printer from './component/printer.png';
import payment from './component/Icon.png';
import background from './component/bgbk.png';
import dbstyles from "./dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={dbstyles.container}>
    <div className={dbstyles.dashboard}>
      <Header logo={logo}/>

      <main className={dbstyles.main}>
      <div className={dbstyles.welcome_row}>
        <div className={dbstyles.welcome_section}>
          <h1 className={dbstyles.greeting}>Good Morning, Thao!</h1>
          <p className={dbstyles.greeting_subtext}>Ready to print something?</p>
          <p className={dbstyles.description}>
            We provide the printing service for all students and lecturers in HCMUT campus.
          </p>
          <div className={dbstyles.actions}>
          <div className={dbstyles.action_item}>
            <img src={user} alt="User" className={dbstyles.action_icon}></img>
            <div>
              <p className={dbstyles.action_title}>STUDENT INFORMATION</p>
              <p className={dbstyles.action_description}>View your information</p>
            </div>
            <span className={dbstyles.action_arrow}>→</span>
          </div>

          <div className={dbstyles.action_item}>
          <img src={printer} alt="Printer" className={dbstyles.action_icon}></img>
            <div>
              <p className={dbstyles.action_title}>PRINT DOCUMENT</p>
              <p className={dbstyles.action_description}>Print your document</p>
            </div>
            <span className={dbstyles.action_arrow}>→</span>
          </div>

          <div className={dbstyles.action_item}>
          <img src={book} alt="Book" className={dbstyles.action_icon}></img>
            <div>
              <p className={dbstyles.action_title}>VIEW HISTORY</p>
              <p className={dbstyles.action_description}>View history of your printing document</p>
            </div>
            <span className={dbstyles.action_arrow}>→</span>
          </div>

          <div className={dbstyles.action_item_last}>
          <img src={payment} alt="Payment" className={dbstyles.action_icon}></img>
            <div>
              <p className={dbstyles.action_title}>PAYMENT</p>
              <p className={dbstyles.action_description}>Buy more paper to print your documents!</p>
            </div>
            <span className={dbstyles.action_arrow}>→</span>
          </div>
        </div>
        </div>
        <div className={dbstyles.image_section}>
            <img src={background} alt=" Background Bach Khoa" className={dbstyles.right_image} />
        </div>
        </div>
        
      </main>
    </div>
    </div>
  );
};

export default Dashboard;
