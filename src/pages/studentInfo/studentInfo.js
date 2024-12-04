import React from "react";
import Header from "../../header";
import styles from "./studentInfo.module.css";
import BlocksLayout from "../stats/blocks/inforBlock";
import { Avatar } from "@mui/material";
import LineChart from "../stats/LineChart";
const InfoBlock = (props) => {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.blockHeader}>{props.header}</div>
      <div className={styles.blockContent}>{props.content}</div>
    </div>
  );
};
const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
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
const StudentInfo = () => {
  return (
    <div>
      <Header></Header>
      <div className={styles.studentPage}>
        <h1>Student Info</h1>
        <div className={styles.studentLayout}>
          <div className={styles.leftLayout}>
            <Avatar sx={{ width: 150, height: 150 }} alt="Remy Sharp" src="" />
            <div className={styles.studentInfo}>
              <InfoBlock
                header="Student Name"
                content="Nguyen Anh Khoa"
              ></InfoBlock>
              <InfoBlock header="Student ID" content="225231"></InfoBlock>
              <InfoBlock header="Email" content="aaaa@gmail.com"></InfoBlock>

              <InfoBlock header="Faculty" content="225231"></InfoBlock>
              <InfoBlock header="Student ID" content="225231"></InfoBlock>
            </div>
          </div>
          <div className={styles.rightLayout}>
            <LineChart title="Usage Statistic" data={lineData} />
            <BlocksLayout></BlocksLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
