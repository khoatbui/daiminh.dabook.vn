/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')

router.get('/',(req,res,next) => {
    console.log(db.get('city').value());
    res.send(db.get('city').value());
})

module.exports = router