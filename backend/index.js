const express = require("express");
const app = express();
const errorHandler = require("../backend/middleware/errorHandler");
const connectDB = require("./config/dbConnection");
app.use(errorHandler);

const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json()); //This is the body parser. Without this, response cannot be observed at the terminal.

app.use("/Citizen/Aadhar", require("../backend/routes/citizenRoutes"));
app.use("/Aadhar/Authentication",require("../backend/routes/authenticationRoutes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});