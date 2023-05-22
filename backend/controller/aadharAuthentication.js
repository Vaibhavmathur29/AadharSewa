const asyncHandler = require("express-async-handler");
const authUser = require("../models/authenticateModel");
const bcrypt = require("bcrypt");

//SIGN-UP(REGISTER)
const registerNRI = asyncHandler(async (req, res) => {
  const { passportNumber, Password, Email } = req.body;
  if (!passportNumber || !Password || !Email) {
    res.status(400);
    throw new Error("Please enter all details");
  }
  //If NRI already registered
  const existingPassport = await authUser.findOne({ passportNumber });
  const existingEmail = await authUser.findOne({ Email });
  if (existingPassport || existingEmail) {
    res.json({
      Message:
        "User already exists in our Database with credentials you provided",
    });
  }
  //If same password exists
  const existingPassword = await authUser.findOne({ Password });
  if (existingPassword) {
    res.json({ Message: "Sorry this password is used by someone else" });
  }
  //Hashed Password
  const hashPassword = await bcrypt.hash(Password, 10);
  console.log("Hashed Password is:", hashPassword);
  //All fine
  res.json({ Message: "Welcome to Aadhar Seva Mr. NRI" });
});
//LOGIN
const loginNRI = asyncHandler(async (req, res) => {
  res.json({ Message: "NRI you just logged in" });
});

//Current

module.exports = { loginNRI, registerNRI };
