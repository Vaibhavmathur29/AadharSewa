const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({Message:"This NRI not authorized"});

        
      }
      console.log(decoded);
    });
    if (!token) {
      return res.status(401).json({Message:"NRI not allowed"});
      
    }
  }
});
module.exports = validateToken;
