const express = require('express')

const authMiddleware = require("../middlewares/AuthMiddlewares");
const {createRestaurentController,getAllRestaurentController,getByidRestaurentController,deleteResturantController} = require('../controllers/restaurentController')

const router = express.Router();

//create restaurendt
router.post('/create',authMiddleware,createRestaurentController)

router.get('/getAll',getAllRestaurentController)
router.get('/get/:id',getByidRestaurentController)
router.delete('/delete/:id',deleteResturantController)

module.exports = router;