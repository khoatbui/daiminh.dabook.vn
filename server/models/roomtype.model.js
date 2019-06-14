var mongoose = require('mongoose')

var roomTypeSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
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