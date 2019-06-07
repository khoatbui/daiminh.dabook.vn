var db = require('../db')
var Hotel = require('../models/hotels.model')

module.exports.index =function(req,res){
    Hotel.find().then(function(hotels){
        res.send({
            hotels:hotels
        })
    })
};

module.exports.getHotel=(req,res,next) => {
    res.send(db.get('hotel').value());
};

module.exports.deleteHotel= function (req, res) {
    db.get('hotel').value().splice(req.params.index, 1)
};

module.exports.insertHotel= function (req, res) {
    db.get('hotel')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
};

module.exports.updateHotel=function (req, res) {
    db.get('hotel')
        .filter({ hotelId: req.body.hotelId })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
};

module.exports.priceSearch=function (req, res) {
    db.get('hotel')
        .filter({ hotelId: req.body.hotelId })
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

