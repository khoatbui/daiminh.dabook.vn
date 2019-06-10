var mongoose = require('mongoose')

var optionServiceSchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    hotelId: mongoose.Schema.Types.ObjectId,
    roomTypeId:mongoose.Schema.Types.ObjectId,
    optionServiceCode:String,
    optionServiceName:String,
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var OptionService =mongoose.model('OptionService',optionServiceSchema,'optionService');

module.exports = OptionService;