var mongoose = require('mongoose')
var hotelSchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    hotelCode: String,
    hotelName: String,
    star: Number,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var Hotel =mongoose.model('Hotel',hotelSchema,'hotel');

module.exports = Hotel;