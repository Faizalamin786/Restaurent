const express = require("express")
const { UserController,updateUserController,updatePasswordController,resetPasswordController,deleteUserController } = require("../controllers/UserController");
const AuthMiddlewares = require("../middlewares/AuthMiddlewares");


const router = express.Router();

router.get('/user', AuthMiddlewares, UserController)
router.put('/update', AuthMiddlewares, updateUserController);
router.post('/updatePassword',AuthMiddlewares,updatePasswordController);
router.post('/resetPassword',AuthMiddlewares,resetPasswordController);
//delete user
router.delete('/deleteUser/:id',AuthMiddlewares,deleteUserController);
module.exports = router;

