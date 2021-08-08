const express=require('express')
const feedController=require('../controller/feed') 

const router=express.Router();

router.get('/calculate',feedController.getBMI)


module.exports=router;