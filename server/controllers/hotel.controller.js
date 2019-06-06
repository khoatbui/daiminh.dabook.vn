var Hotel = require('../models/hotels.model')

module.exports.index =function(req,res){
    Hotel.find().then(function(hotels){
        res.send({
            hotels:hotels
        })
    })
};