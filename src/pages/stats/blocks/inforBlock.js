import React from "react";
import styles from "./inforBlock.module.css";

const InformationBlock = ({ title, content, Icon, color }) => {
  return (
    <div className={styles.informationBlock}>
      {Icon && (
        <Icon sx={{ fontSize: 32, color: { color } }} className={styles.icon} />
      )}
      <div className={styles.rightBlock}>
        <h3 style={(color = { color })} className={styles.blockTitle}>
          {title}
        </h3>
        <p className={styles.blockContent}>{content}</p>
      </div>
    </div>
  );
};

const BlocksLayout = () => {
  return (
    <div className={styles.blocksContainer}>
      <InformationBlock
        color="#1967D2"
        title="55"
        content="Active User"
        Icon={require("@mui/icons-material/PersonOutline").default}
      />
      <InformationBlock
        color="#F9AB00"
        title="100"
        content="Transaction"
        Icon={require("@mui/icons-material/AttachMoney").default}
      />
      <InformationBlock
        color="#34A853"
        title="100"
        content="Active Printers"
        Icon={require("@mui/icons-material/FileCopy").default}
      />
      <InformationBlock
        color="#D31818"
        title="500"
        content="Print Request"
        Icon={require("@mui/icons-material/LocalPrintshop").default}
      />
    </div>
  );
};

export default BlocksLayout;
