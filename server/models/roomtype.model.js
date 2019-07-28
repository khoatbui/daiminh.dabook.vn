var mongoose = require('mongoose')

var roomTypeSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeCode:String,
    roomTypeName:String,
    maxGuest: Number,
    maxLess4: Number,
    maxLess12: Number,
    roomTypeIntro: String,
    bed: Number,
    acreage:String,
    lang: String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    roomImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    roomTypeIntros:[]
});
var RoomType =mongoose.model('RoomType',roomTypeSchema,'roomType');

module.exports = RoomType;