import React, { useEffect, useState } from "react";
import styles from "./stats.module.css";
import ChartComponent from "./DoughnutChart";
import LineChart from "./LineChart";
import PrinterList from "../printerList/printerList";
import BlocksLayout from "./blocks/inforBlock";
import axios from "axios";
import moment from "moment";

const data = [
  {
    color: "#1967D2",
    title: "55",
    content: "Active User",
    icon: require("@mui/icons-material/PersonOutline").default,
  },
  {
    color: "#F9AB00",
    title: "100",
    content: "Transaction",
    icon: require("@mui/icons-material/AttachMoney").default,
  },
  {
    color: "#34A853",
    title: "100",
    content: "Active Printers",
    icon: require("@mui/icons-material/FileCopy").default,
  },
  {
    color: "#D31818",
    title: "500",
    content: "Print Request",
    icon: require("@mui/icons-material/LocalPrintshop").default,
  },
];

const Stats = () => {
  const backend = process.env.REACT_APP_BACKEND_PORT;
  const [printerData, setPrinterData] = useState([]);
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  // @ts-ignore
  // @ts-ignore
  const [error, setError] = useState("");
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        fill: false,
        borderColor: "#1967D2",
        tension: 0.1,
      },
    ],
  });

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  const fetchDoughnutData = async () => {
    try {
      const response = await axios.get(`${backend}/api/printer/info`);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data);

        const labels = response.data.map((item) => `Printer ${item.label}`);
        const values = response.data.map((item) => parseFloat(item.value));

        const backgroundColor = response.data.map(() => generateRandomColor());

        setDoughnutData({
          // @ts-ignore
          labels: labels,
          datasets: [
            {
              // @ts-ignore
              data: values,
              // @ts-ignore
              backgroundColor: backgroundColor,
              hoverOffset: 4,
            },
          ],
        });
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };

  const fetchPrinter = async () => {
    try {
      const response = await axios.get(`${backend}/api/printer`);
      if (response.data) {
        setPrinterData(response.data);
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/printer/history/months/6`
      );
      if (response.data) {
        const months = [
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        let counters = Array(6).fill(0);

        response.data.forEach((item) => {
          const monthIndex = moment(item.order_month, "YYYY-MM").month() - 6;
          counters[monthIndex] = item.counter;
        });

        setLineData({
          // @ts-ignore
          labels: months,
          datasets: [
            {
              label: "Total",
              // @ts-ignore
              data: counters,
              fill: false,
              borderColor: "#1967D2",
              tension: 0.1,
            },
          ],
        });
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrinter();
    fetchData();
    fetchDoughnutData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <main className={styles.main}>
          <div className={styles.leftContainer}>
            <div className={styles.doughnutContainer}>
              <ChartComponent data={doughnutData} />
            </div>
            <PrinterList data={printerData}></PrinterList>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.lineContainer}>
              <LineChart title="All Printers Statistic" data={lineData} />
            </div>
            <BlocksLayout data={data}></BlocksLayout>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
