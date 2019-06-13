var mongoose = require('mongoose')

var pakageHotelRELSchema = new mongoose.Schema({
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    packageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    startDate:Date,
    endDate:Date,
    markUpPlus:Number,
    markUpPercent:Number,
    maxAdult:Number,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var PackageHotelREL =mongoose.model('PackageHotelREL',pakageHotelRELSchema,'packageHotelREL');

module.exports = PackageHotelREL;