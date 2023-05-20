const asyncHandler = require("express-async-handler");
const aadhar = require("../models/aadharModels");
//FETCH AADHAR NUMBER
//GET Request

const getAadhar = asyncHandler(async (req, res) => {
  const Email = req.params.Email;

  const Aadhar = await aadhar.findOne({ Email });
  if (!Aadhar) {
    res.status(404);
    throw new Error("Aadhar not found. You are not an Indian Citizen");
  }

  res.status(200).json({
    Message: `Dear ${Aadhar.Name}, your Aadhar number is ${Aadhar.Aadhar}`,
  });
});

//Register your citizenship at Govt Database
//POST Request
const registerAadhar = asyncHandler(async (req, res) => {
  console.log("Request body is:", req.body);
  const { Name, Email, Aadhar } = req.body;
  if (!Name || !Email || !Aadhar) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const existingEmail = await aadhar.findOne({ Email });
  const existingAadhar = await aadhar.findOne({ Aadhar });
  if (existingEmail || existingAadhar) {
    res.status(400);
    throw new Error("Citizenship already registered");
    //If wanted to display above error in JSON format then use the code
    //return res.status(400).json({"Fraud Case":"Citizenship already registered"})
    //But this will work only with thunderclient and not VS code terminal.But above code will throw error in
    //both VS code terminal and Thunderclient, but not in JSON format
  }

  const Citizen = await aadhar.create({
    Name,
    Email,
    Aadhar,
  });

  res.status(201).json({ Citizen });
});
//Surrender Indian Citizenship
//DELETE Request
  const surrenderAadhar = asyncHandler(async (req, res) => {
    const {Aadhar}=req.body
    const citizen = await aadhar.findOne({Aadhar});
    if (!citizen) {
      res.status(404);
      throw new Error("Contact not found");
    }
   
    await citizen.deleteOne(citizen)
    res.status(200).json({
      Message: `Dear ${Aadhar.Name}, your citizenship has been surrendered successfully!!`,
    });
  });

//Update details at Govt Database
//PUT Request

const updateAadhar = asyncHandler(async (req, res) => {
  const citizen = await aadhar.findById(req.params.id);
  if (!citizen) {
    res.status(404);
    throw new Error("Citizenship not found");
  }

  const updatedAadhar = await aadhar.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedAadhar);
});
module.exports = { getAadhar, registerAadhar, surrenderAadhar, updateAadhar };
