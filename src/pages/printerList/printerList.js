import React from "react";
import styles from "./printerList.module.css";
import { useNavigate } from "react-router-dom";
const PrinterLine = (props) => {
  const printerId = props.id;
  const navigate = useNavigate();
  return (
    <div className={styles.lineContainer}>
      <div className={styles.block}>
        <h3>Printer{props.id}</h3>
      </div>
      <div className={styles.block}>
        <h3>{props.location}</h3>
      </div>
      <div className={styles.block}>
        <button
          onClick={() => navigate("/printer", { state: { printerId } })}
          className={styles.blueBtn}
        >
          View
        </button>
      </div>
    </div>
  );
};

const PrinterList = () => {
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.block}>
          <h3 className={styles.blueText}>Printer</h3>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blueText}>Location</h3>
        </div>
        <div className={styles.block}>
          <h3 className={styles.blueText}>View Report</h3>
        </div>
      </div>
      <div className={styles.printerList}>
        <PrinterLine id="#3" location="A4-502"></PrinterLine>
        <PrinterLine id="#5" location="A2-102"></PrinterLine>
        <PrinterLine id="#6" location="A3-202"></PrinterLine>
        <PrinterLine id="#7" location="A1-202"></PrinterLine>
        <PrinterLine id="#7" location="A1-202"></PrinterLine>{" "}
        <PrinterLine id="#7" location="A1-202"></PrinterLine>
        <PrinterLine id="#7" location="A1-202"></PrinterLine>
        <PrinterLine id="#7" location="A1-202"></PrinterLine>
      </div>
    </div>
  );
};

export default PrinterList;
