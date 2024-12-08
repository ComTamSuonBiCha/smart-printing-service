import React from "react";
import styles from "./printerDetail.module.css";

// Component for each individual line in the recent usage list
const RecentLine = ({ name, time, file }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {name}
      </p>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {time}
      </p>
      <p
        style={{ backgroundColor: "#C4E1F6", color: "#000" }}
        className={styles.blueBtn}
      >
        {file}
      </p>
    </div>
  );
};

const RecentlyBlock = ({ data, location, status }) => {
  return (
    <div className={styles.recentLayout}>
      <h2>Recently Used</h2>

      <div className={styles.printerInfo}>
        <div className={styles.printerChild}>
          <div className={styles.blueBtn}>Location</div>
          <div
            style={{ backgroundColor: "#C4E1F6", color: "#000" }}
            className={styles.blueBtn}
          >
            {location}
          </div>
        </div>
        <div className={styles.printerChild}>
          <div className={styles.blueBtn}>Status</div>
          <div
            style={{ backgroundColor: "#C4E1F6", color: "#000" }}
            className={styles.blueBtn}
          >
            {status === 1 ? "Active" : "Unactive"}
          </div>
        </div>
      </div>

      <div className={styles.recentTitle}>
        <h3>Name</h3>
        <h3>Time</h3>
        <h3>FileName</h3>
      </div>

      <div className={styles.recentInfoLayout}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <RecentLine
              key={index}
              name={item.name}
              time={item.time}
              file={item.file}
            />
          ))
        ) : (
          <p>No recent printer usage data found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyBlock;
