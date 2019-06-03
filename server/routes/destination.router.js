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

router.get('/',(req,res,next) => {
    console.log(db.get('destination').value());
    res.send(db.get('destination').value());
})

module.exports = router