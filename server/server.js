const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Set up middleware
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Make sure CLIENT_URL is defined in .env
    credentials: true,
  })
);

// Routes
const apiRouter = require("./src/routes"); // Assuming your routes are in 'src/routes'

app.use("/api", apiRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server is currently broken down!");
});

// Start the server
const port = process.env.PORT || 8080; // Set port, falling back to 8080 if not in .env
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
