const {loginNRI,registerNRI}=require("../controller/aadharAuthentication")
const express=require("express");
const app=express()
const router=express.Router();
router.route("/Login").post(loginNRI);
router.route("/Register").post(registerNRI);
module.exports=router;