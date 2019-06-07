var mongoose = require('mongoose')

var hotelSchema = new mongoose.Schema({
    supplierId: String,
    hotelId: String,
    hotelName: String,
    star: String
});
var Hotel =mongoose.model('Hotel',hotelSchema,'hotels');

module.exports = Hotel;