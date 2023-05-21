const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aadharSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Aadhar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{12}/.test(v);
      },
      message: props => `${props.value} is not a valid Aadhar number!Please enter 12 digit aadhar number`
    }
  }
});

const aadharUser = mongoose.model("Aadhar", aadharSchema);

module.exports = aadharUser;

