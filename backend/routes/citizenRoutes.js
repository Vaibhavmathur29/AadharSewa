const {
  getAadhar,
  registerAadhar,
  surrenderAadhar,
  updateAadhar,
} = require("../controller/aadharController");
const express = require("express");
const app = express();
const router = express.Router();

router.route("/Register").post(registerAadhar); //Registration(post)
router.route("/Update/:id").put(updateAadhar); //Update
router.route("/Surrender/:Email").delete(surrenderAadhar); //Delete
router.route("/Fetch/:Email").get(getAadhar); //Get

module.exports = router;