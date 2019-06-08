var db = require('../db')
var Hotel = require('../models/hotels.model')

module.exports.index =function(req,res){
    Hotel.find().then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getHotel=(req,res,next) => {
    Hotel.find().then(function(hotel){
        res.send(hotel)
    })
};

module.exports.deleteHotel= function (req, res) {
    console.log(req.params._id );
    Hotel.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertHotel= function (req, res) {
    console.log(req.body);
    Hotel.create(req.body, function (err, hotel) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(hotel)
        }
        })
};

module.exports.updateHotel=function (req, res) {
    console.log(req.params._id);
    console.log(req.body);
    Hotel.updateOne({ _id: req.params._id },{$set:req.body}).exec(function(err, hotel){
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
                 res.status(200).send(hotel);
        }
     });
};

module.exports.priceSearch=function (req, res) {
    db.get('hotel')
        .filter({ hotelCode: req.body.hotelCode })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
};

module.exports.getHotelBySupplier=(req,res,next) => {
    res.send(db.get('hotel').filter({ supplierId: req.params.index }).value());
};

module.exports.getPackageBySupplier=(req,res,next) => {
    res.send(db.get('package').filter({ supplierId: req.params.index }).value());
};

module.exports.getRoomTypeBySupplier=(req,res,next) => {
    res.send(db.get('roomType').filter({ supplierId: req.params.index }).value());
};

module.exports.getAdditionServiceBySupplier=(req,res,next) => {
    res.send(db.get('optionService').filter({ supplierId: req.params.index }).value());
};

