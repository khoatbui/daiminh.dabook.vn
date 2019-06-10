var mongoose = require('mongoose')

var roomTypeSchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    hotelId: mongoose.Schema.Types.ObjectId,
    roomTypeCode:String,
    roomTypeName:String,
    lang: String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var RoomType =mongoose.model('RoomType',roomTypeSchema,'roomType');

module.exports = RoomType;