import React from "react";
import styles from "./printerList.module.css";
import { useNavigate } from "react-router-dom";
const PrinterLine = (props) => {
  const printerId = props.id;
  const navigate = useNavigate();
  return (
    <div className={styles.lineContainer}>
      <div className={styles.block}>
        <h3>Printer#{props.id}</h3>
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

const PrinterList = (props) => {
  const { data } = props;

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
        {data.map((printer) => (
          <PrinterLine id={printer.printer_id} location={printer.location} />
        ))}
      </div>
    </div>
  );
};

export default PrinterList;
