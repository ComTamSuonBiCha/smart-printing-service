import React from "react";
import styles from "./printerDetail.module.css";

const RecentLine = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {props.name}
      </p>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {props.time}
      </p>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {props.file}
      </p>
    </div>
  );
};
const RecentlyBlock = () => {
  return (
    <div className={styles.recentLayout}>
      <h2>Recently Uses</h2>

      <div className={styles.printerInfo}>
        <div className={styles.printerChild}>
          <div className={styles.blueBtn}>Location</div>
          <div
            style={{ backgroundColor: "#C4E1F6", color: "#000" }}
            className={styles.blueBtn}
          >
            Campus 1 - A4 - 504
          </div>
        </div>
        <div className={styles.printerChild}>
          <div className={styles.blueBtn}>Status</div>
          <div
            style={{ backgroundColor: "#C4E1F6", color: "#000" }}
            className={styles.blueBtn}
          >
            Campus 1 - A4 - 504
          </div>
        </div>
      </div>
      <div className={styles.recentTitle}>
        <h3>Name</h3>
        <h3>Time</h3>
        <h3>FileName</h3>
      </div>
      <div className={styles.recentInfoLayout}>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
        <RecentLine
          name="Khoa"
          time="2024-10-23 10:10"
          file="data.pdf"
        ></RecentLine>
      </div>
    </div>
  );
};

export default RecentlyBlock;
