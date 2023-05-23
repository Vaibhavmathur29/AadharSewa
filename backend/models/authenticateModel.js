const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Passport number must be a 6-digit string with 2 uppercase alphabets and 4 numeric values
        return /^[A-Z]{2}[0-9]{4}$/.test(value);
      },
      message:
        "Passport number must be a 6-digit string with 2 uppercase alphabets and 4 numeric values",
    },
  },
  Password: {
   
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (value) {
        // Password must have at least one uppercase letter, one lowercase letter, one numeric value,
        // and can have at most one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/.test(value);
      },
      message:
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one numeric value, and can have at most one special character",
    },
  },

  Email: {
    type: String,
    required: true,
  },
});

const authUser = mongoose.model("Passport", authSchema);

module.exports = authUser;
