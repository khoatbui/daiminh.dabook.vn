/*=======GET LIST PROMOTION======
[{+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
}]

/*=======GET LIST PROMOTION======
[{+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
}]

/*=======GET LIST TOUR THEO DIEM DEN HOT======
[+ Điểm đến [{+ Hình ảnh
            + Link
            + Title
            + Noi dung
            }]
]

/*=======GET LIST DESTINATION======
NOI DIA
 [
     {+ Tinh thanh
      + Link
     }
 ]

 QUOC TE
 [
     {+ Tinh thanh
      + Link
     }
 ]
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')

router.get('/area',(req,res) => {
    res.send(db.get('area').value());
})
router.get('/hot-tour-list', (req,res) =>{
    res.send('hottour-list')
})

router.get('/promotion-list', (req,res) =>{
    res.send('promotion-list')
})

router.get('/destination-list', (req,res) =>{
    res.send('hottour-list')
})
module.exports = router