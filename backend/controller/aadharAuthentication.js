const asyncHandler = require("express-async-handler");
const authUser = require("../models/authenticateModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const NRI = await authUser.create({
    passportNumber,
    Password: hashPassword,
    Email,
  });
  if (NRI) {
    res.status(201).json({ _id: NRI.id, Email: NRI.Email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  console.log(`User created ${NRI}`);

  //All fine
  res.json({ Message: "Welcome to Aadhar Seva Mr. NRI" });
});
//LOGIN
const loginNRI = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    res.status(400);
    throw new Error("All fields are mandatorys");
  }
  const Indian = await authUser.findOne({ Email });
  //Compare password with hashed password
  if (Indian && (await bcrypt.compare(Password, Indian.Password))) {
    //Here the first password is that one which is extracted from the user from the request body, and second one is the hashed password
    const accessToken = jwt.sign(
      {
        Indian: {
          passportNumber: Indian.passportNumber,
          Email: Indian.Email,
          id: Indian.id,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "10m",
      }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("INvalid credentials for login");
  }

  res.json({ Message: "NRI you just logged in" });
});

//Current
const currentUser=asyncHandler(async(req,res)=>{
  res.json({Message:"Current user info"})
})

module.exports = { loginNRI, registerNRI,currentUser};
