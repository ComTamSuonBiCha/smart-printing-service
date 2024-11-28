const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(morgan("combined"));

const apiRouter = require("./routes");
const cors = require("cors");

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server is currently broke down!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
