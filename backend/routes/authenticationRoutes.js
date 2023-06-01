const {loginNRI,registerNRI,currentUser}=require("../controller/aadharAuthentication")
const express=require("express");
const app=express()
const router=express.Router();
const validateToken=require("../middleware/validateTokenHandler");

router.route("/Login").post(loginNRI);
router.route("/Register").post(registerNRI);
router.route("/Current").get(validateToken,currentUser);
module.exports=router;