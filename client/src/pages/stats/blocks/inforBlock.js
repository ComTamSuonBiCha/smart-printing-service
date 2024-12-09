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

const BlocksLayout = (props) => {
  return (
    <div className={styles.blocksContainer}>
      {props.data.map((item, index) => (
        <InformationBlock
          key={index}
          color={item.color}
          title={item.title}
          content={item.content}
          Icon={item.icon}
        />
      ))}
    </div>
  );
};

export default BlocksLayout;
