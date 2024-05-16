const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const UserController = async(req,res) => {
try {
  //find user
  const user = await UserModel.findById({_id:req.body.id});
  if(!user){
    return res.status(404).send({
        sucess:false,
        message: "User not found"
    })
  }
  user.password = undefined;

  res.status(200).send({
    sucess:true,
    message: "User get succesfully",
    user,
  })
    
    
} catch (error) {
    res.status(404).send({message:error.message});
}

}
const updateUserController =async (req,res) => {
  try {
    //find user
    const user = await UserModel.findById({_id:req.body.id})
    //validation
    if(!user){
      return res.status(400).send({
        sucess:false,
        message:"user not found"

      })
    }
    //update
const {userName,address,phone} = req.body;
if(userName) user.userName = userName
if(address) user.address = address
if(phone) user.phone = phone
//save user

await user.save()
res.status(200).send({
  sucess: true,
  message:"user updated successfully"
})
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: error.message

    })
    
  }


}
//update user password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await UserModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};
//reset password
const resetPasswordController = async(req, res) => {
  try {
    const {email, password,answer} = req.body
    if(!email,!password,!answer) {
      return res.status(500).send({
        sucess: false,
        messgae:"please provide all feild"
      })
    }
    const user = await UserModel.findOne({email,answer})
    if(!user){
      return res.status(500).send({
        sucess:false,
        message:"user not found please provide valied email and password"

      })
    }
     //hashing password
     var salt = bcrypt.genSaltSync(10);
     const hashedPassword = await bcrypt.hash(newPassword, salt);
     user.password = hashedPassword;
     await user.save();
     res.status(200).send({
       success: true,
       message: "Password Reset SUccessfully",
     });
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message:"error in reset password",
      error

    })
    
  }

}
//delete user
const deleteUserController = async(req,res)=>{
try {
  await UserModel.findByIdAndDelete(req.params.id)
  return res.status(200).send({
    success: true,
    message: 'User deleted successfully'
  })
  
} catch (error) {
  console.log(error);
  res.status(500).send({
    sucess:false,
    message:"error in profilr",
    error
  })

}

}

module.exports = {UserController,updateUserController,updatePasswordController,resetPasswordController,deleteUserController}
