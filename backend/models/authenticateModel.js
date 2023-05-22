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
    validate: {
      validator: function (value) {
        // Password must be at least 6 characters long
        if (value.length < 6) {
          return false;
        }

        // At least one uppercase letter
        if (!/[A-Z]/.test(value)) {
          return false;
        }

        // At least one lowercase letter
        if (!/[a-z]/.test(value)) {
          return false;
        }

        // Max one special character
        if (
          /[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]+.*[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]/.test(
            value
          )
        ) {
          return false;
        }

        // At least one numeric value
        if (!/\d/.test(value)) {
          return false;
        }

        return true;
      },
      message:
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one numeric value, and a maximum of one special character",
    },
  },

  Email: {
    type: String,
    required: true,
  },
});

const authUser = mongoose.model("Passport", authSchema);

module.exports = authUser;
