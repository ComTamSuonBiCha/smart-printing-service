import React, { useEffect, useState } from "react";
// @ts-ignore
import Header from "../../header";
import styles from "./studentInfo.module.css";
import BlocksLayout from "../stats/blocks/inforBlock";
import { Avatar } from "@mui/material";
import LineChart from "../stats/LineChart";
import axios from "axios";

const InfoBlock = (props) => {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.blockHeader}>{props.header}</div>
      <div className={styles.blockContent}>{props.content}</div>
    </div>
  );
};

const lineData = {
  labels: ["July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Total",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "#1967D2",
      tension: 0.1,
    },
  ],
};

const data = [
  {
    color: "#1967D2",
    title: "55",
    content: "Usage Frequency",
    icon: require("@mui/icons-material/Print").default,
  },
  {
    color: "#F9AB00",
    title: "100",
    content: "Pages Used",
    icon: require("@mui/icons-material/RequestPage").default,
  },
  {
    color: "#34A853",
    title: "100",
    content: "Paper Left",
    icon: require("@mui/icons-material/Feed").default,
  },
  {
    color: "#D31818",
    title: "500",
    content: "Total Transaction",
    icon: require("@mui/icons-material/AttachMoney").default,
  },
];

const StudentInfo = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const studentID = localStorage.getItem("userid");

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.52:5000/api/student/id/${studentID}`
      );
      if (response.data && response.data.length > 0) {
        setStudentData(response.data[0]);
      } else {
        // @ts-ignore
        setError("Student data not found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch student data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (studentID) {
      fetchStudentData();
    } else {
      // @ts-ignore
      setError("User ID is missing.");
    }
  }, [studentID]);

  // Handling loading, error, or null state for student data
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!studentData) {
    return <div className={styles.loading}>Loading student data...</div>;
  }

  return (
    <div>
      <div className={styles.studentPage}>
        <h1>Student Info</h1>
        <div className={styles.studentLayout}>
          <div className={styles.leftLayout}>
            <Avatar
              sx={{ width: 150, height: 150 }}
              alt="Student Avatar"
              // @ts-ignore
              // src={studentData.avatar || "/path/to/default-avatar.png"} // Use a default avatar
            />
            <div className={styles.studentInfo}>
              <InfoBlock
                header="Student Name"
                // @ts-ignore
                content={studentData.student_name || "N/A"}
              />
              <InfoBlock
                header="Student ID"
                // @ts-ignore
                content={studentData.student_id || "N/A"}
              />
              <InfoBlock
                header="Email"
                // @ts-ignore
                content={studentData.student_email || "N/A"}
              />
              <InfoBlock
                header="Faculty"
                // @ts-ignore
                content="OISP"
              />
            </div>
          </div>
          <div className={styles.rightLayout}>
            <LineChart title="Usage Statistic" data={lineData} />
            <BlocksLayout data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
