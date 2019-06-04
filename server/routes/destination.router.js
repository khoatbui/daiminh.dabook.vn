/*=======GET DESTINATION LIST======
NOI DIA
[4 tinh thanh hot]
[
    {+ Tinh thanh
    + Link
    + Hinh anh
    }
]

 QUOC TE
[4 tinh thanh hot]
[{+ Tinh thanh
    + Link
    + Hinh anh
    }]

[{+ Ten tinh thanh trong nuoc
    + Duong link
    }]

[{+ Ten tinh thanh trong nuoc
    + Duong link
    }]
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
    res.send(db.get('destination').value());
})

router.delete('/:index', function (req, res) {
    db.get('destination').value().splice(req.params.index, 1)
    console.log(req.params.index);
})

router.get('/des/:id', (req, res, next) => {
    var id = req.params.id;
    var destinations = db.get('destination').find({ destinationId: id });
    res.send(destinations);
})

router.get('/tstyle/:id', (req, res, next) => {
    var id = req.params.id;
    var destinations = db.get('destination').find({ travelStyleId: id });
    res.send(destinations);
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('destination')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('destination')
        .filter({ destinationId: req.body.destinationId })
        .filter( v=> v.lang=== req.body.lang || v.lang=== "")
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
})
module.exports = router