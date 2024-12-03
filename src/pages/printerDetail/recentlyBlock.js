import React from "react";
const RecentLine = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{props.name}</p>
      <p>{props.time}</p>
      <p>{props.file}</p>
    </div>
  );
};
const RecentlyBlock = () => {
  return (
    <div>
      <div></div>
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
  );
};

export default RecentlyBlock;
