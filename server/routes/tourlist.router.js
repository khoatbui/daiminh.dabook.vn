var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req,res,next) => {
    console.log(db.get('tourList').value());
    res.send(db.get('tourList').value());
})


router.get('/des/:id', (req,res,next) =>{
    var id= req.params.id;
    var tours=db.get('tourList').find({destinationId:id});
    res.send(tours);
})

router.get('/tstyle/:id', (req,res,next) =>{
    var id= req.params.id;
    var tours=db.get('tourList').find({travelStyleId:id});
    res.send(tours);
})

router.post('/insert', jsonParser, function (req, res) {
    console.log(req.body.editedItem);
    db.get('tourList')
    .push({
        destinationId: "INMB",
        travelStyleId: "AD",
        cityId: "INMBHL",
        tourId: "INMBHL01",
        tourName: "HA LONG => QUANG NINH 1 NGAY 1 DEM",
        tourOveview: "Like so many organizations these days, Autodesk is a company in transition. It was until recently a traditional boxed software company selling licenses. Yet its own business model disruption is only part of the story — and",
        from: "HA LONG",
        to: " QUANG NINH",
        startDay: "13-04-2019",
        endDay: "15-04-2019",
        img: "",
        price: "1.000.000",
        unitType: "",
        link: "",
        tags: "Ha long,mao hiem",
        voteStatus: "SUAT SAC",
        voteScore: "9.1",
        day: "1",
        discount: "30",
        creator: "KhoatBui",
        createDate: "13-04-2019",
        lang: "VI"
    })
    .write()
        res.send('CREATE COMPLETED')
    })

    router.post('/update', function (req, res) {
        db.get('tourList')
        .push({
            destinationId: "INMB",
            travelStyleId: "AD",
            cityId: "INMBHL",
            tourId: "INMBHL01",
            tourName: "HA LONG => QUANG NINH 1 NGAY 1 DEM",
            tourOveview: "Like so many organizations these days, Autodesk is a company in transition. It was until recently a traditional boxed software company selling licenses. Yet its own business model disruption is only part of the story — and",
            from: "HA LONG",
            to: " QUANG NINH",
            startDay: "13-04-2019",
            endDay: "15-04-2019",
            img: "",
            price: "1.000.000",
            unitType: "",
            link: "",
            tags: "Ha long,mao hiem",
            voteStatus: "SUAT SAC",
            voteScore: "9.1",
            day: "1",
            discount: "30",
            creator: "KhoatBui",
            createDate: "13-04-2019",
            lang: "VI"
        })
        .write()
            res.send('CREATE COMPLETED')
        })
module.exports = router