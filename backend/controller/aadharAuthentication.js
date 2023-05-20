const asyncHandler = require("express-async-handler");
//Login
const loginNRI = asyncHandler(async (req, res) => {
  res.json({ Message: "NRI you just logged in" });
});

//Sign-up(Register)
const registerNRI = asyncHandler(async (req, res) => {
  res.json({ Message: "Welcome to Aadhar Seva Mr. NRI" });
});

//Current

module.exports = { loginNRI, registerNRI };
