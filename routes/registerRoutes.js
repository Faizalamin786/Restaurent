const express = require("express");
const {registerController,loginController} = require("../controllers/registerController");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);
router.post("/login",loginController);


// LOGIN || POST


module.exports = router;