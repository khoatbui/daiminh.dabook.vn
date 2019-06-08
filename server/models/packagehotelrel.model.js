var mongoose = require('mongoose')

var pakageHotelRELSchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    hotelId: mongoose.Schema.Types.ObjectId,
    roomTypeId: mongoose.Schema.Types.ObjectId,
    packageId: mongoose.Schema.Types.ObjectId,
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var PackageHotelREL =mongoose.model('PackageHotelREL',pakageHotelRELSchema,'packageHotelREL');

module.exports = PackageHotelREL;