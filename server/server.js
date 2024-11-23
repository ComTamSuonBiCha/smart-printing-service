const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("combined"));
const port = process.env.PORT || 8080;
const router = require("./src/routes");
const cors = require("cors");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/aa", (req, res) => {
  res.send("hello");
});

app.listen(port, () => console.log("example app"));
