const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
    try {
      const { userName, email, password, phone, address, answer } = req.body;
      //validation
      if (!userName || !email || !password || !address || !phone || !answer) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      // chekc user
      const exisiting = await UserModel.findOne({ email });
      if (exisiting) {
        return res.status(500).send({
          success: false,
          message: "Email Already Registerd please Login",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //create new user
      const user = await UserModel.create({
        userName,
        email,
        password: hashedPassword,
        address,
        phone,
        answer,
      });
      res.status(201).send({
        success: true,
        message: "Successfully Registered",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
      });
    }
  };
  //loginController

  const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
     if(!email||!password){
        return res.status(500).send({
            success: false,
            message:"please provide a valid email and password"
        })
     }
     //check user
     const user = await UserModel.findOne({email})
     if(!user){
        return res.status(404).send({
            success: false,
            message:"user not found"
        });
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.status(500).send({
            success: false,
            message:"password mismatch"
        })
     }
     //token
const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
    expiresIn:"7d"
})
user.password = undefined;

     res.status(200).send({
        success: true,
            message:"Login successful",
            token,
            user
     })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Login API",
            error
        })
        
    }


  }


module.exports = {registerController,loginController};
