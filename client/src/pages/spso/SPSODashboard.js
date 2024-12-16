import React from "react";
import user from "../../component/user.png";
import book from "../../component/Book.png";
import printer from "../../component/printer.png";
import background from "../../component/bgbk.png";
import dbstyles from "./SPSODashboard.module.css";
import { useNavigate } from "react-router-dom";

const SPSODashboard = () => {
  const navigate = useNavigate();
  return (
    <div className={dbstyles.container}>
      <div className={dbstyles.dashboard}>
        <main className={dbstyles.main}>
          <div className={dbstyles.welcome_row}>
            <div className={dbstyles.welcome_section}>
              <h1 className={dbstyles.greeting}>Good Morning, SPSO!</h1>
              <p className={dbstyles.greeting_subtext}>
                Ready to manage system?
              </p>
              <p className={dbstyles.description}>
                We provide the printing service for all students and lecturers
                in HCMUT campus.
              </p>
              <div
                onClick={() => navigate("/stats")}
                className={dbstyles.actions}
              >
                <div className={dbstyles.action_item}>
                  <img
                    src={user}
                    alt="User"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>MANAGE PRINTERS</p>
                    <p className={dbstyles.action_description}>
                      View your information
                    </p>
                  </div>
                  <span className={dbstyles.action_arrow}>→</span>
                </div>

                <div className={dbstyles.action_item}>
                  <img
                    src={printer}
                    alt="Printer"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>PRINT REPORT</p>
                    <p className={dbstyles.action_description}>
                      Print your document
                    </p>
                  </div>
                  <span className={dbstyles.action_arrow}>→</span>
                </div>

                <div className={dbstyles.action_item}>
                  <img
                    src={book}
                    alt="Book"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>VIEW HISTORY</p>
                    <p className={dbstyles.action_description}>
                      View history of your printing document
                    </p>
                  </div>
                  <span className={dbstyles.action_arrow}>→</span>
                </div>
              </div>
            </div>
            <div className={dbstyles.image_section}>
              <img
                src={background}
                alt=" Background Bach Khoa"
                className={dbstyles.right_image}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SPSODashboard;
