import React, { useEffect, useState } from "react";
import user from "./component/user.png";
import book from "./component/Book.png";
import printer from "./component/printer.png";
import payment from "./component/Icon.png";
import background from "./component/bgbk.png";
import dbstyles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const data = localStorage.getItem("userid");

  // @ts-ignore
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.52:5000/api/student/id/${data}`
      );
      setStudentData(response.data[0]);
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch student data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);
  // @ts-ignore
  return (
    <div className={dbstyles.container}>
      <div className={dbstyles.dashboard}>
        <main className={dbstyles.main}>
          <div className={dbstyles.welcome_row}>
            <div className={dbstyles.welcome_section}>
              <h1 className={dbstyles.greeting}>
                Good Morning,{" "}
                {studentData
                  ? // @ts-ignore
                    studentData.student_name
                  : "Student"}
                !
              </h1>
              <p className={dbstyles.greeting_subtext}>
                Ready to print something?
              </p>
              <p className={dbstyles.description}>
                We provide the printing service for all students and lecturers
                in HCMUT campus.
              </p>
              {error && <p className={dbstyles.error}>{error}</p>}{" "}
              <div className={dbstyles.actions}>
                <div
                  onClick={() => navigate("/student")}
                  className={dbstyles.action_item}
                >
                  <img
                    src={user}
                    alt="User"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>STUDENT INFORMATION</p>
                    <p className={dbstyles.action_description}>
                      View your information
                    </p>
                  </div>
                  <span className={dbstyles.action_arrow}>→</span>
                </div>

                <div
                  className={dbstyles.action_item}
                  onClick={() => navigate("/print")}
                >
                  <img
                    src={printer}
                    alt="Printer"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>PRINT DOCUMENT</p>
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

                <div className={dbstyles.action_item_last}>
                  <img
                    src={payment}
                    alt="Payment"
                    className={dbstyles.action_icon}
                  ></img>
                  <div>
                    <p className={dbstyles.action_title}>PAYMENT</p>
                    <p className={dbstyles.action_description}>
                      Buy more paper to print your documents!
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

export default Dashboard;
