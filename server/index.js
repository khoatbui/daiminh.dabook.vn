const express = require('express')
const app = express()
const port = 3000

const low =require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// ******************************HOME********************************************

/*=======GET LIST PROMOTION======
[{+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
}]
==================================*/
app.get('/promotion-list', (req,res) =>{
    res.send('promotion-list')
})

/*=======GET LIST TOUR THEO DIEM DEN HOT======
[+ Điểm đến [{+ Hình ảnh
            + Link
            + Title
            + Noi dung
            }]
]
==================================*/
app.get('/hot-tour-list', (req,res) =>{
    res.send('hottour-list')
})
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
app.get('/destination-list', (req,res) =>{
    res.send('hottour-list')
})


// ******************************DESTINATION********************************************//
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



// ******************************TRAVEL STYLE PAGE********************************************//
/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/


app.set('view engine','pug');
app.set('views','./views');

app.get('/', (req,res) =>{
    res.send('hello world')
})

app.listen(port,() => console.log('Server run'))