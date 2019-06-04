/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req,res,next) => {
    res.send(db.get('city').value());
})

router.delete('/:index', function (req, res) {
    db.get('city').value().splice(req.params.index, 1)
    console.log(req.params.index);
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('city')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('city')
        .filter({ cityId: req.body.cityId })
        .filter( v=> v.lang=== req.body.lang || v.lang=== "")
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
})
module.exports = router