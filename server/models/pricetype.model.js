var mongoose = require('mongoose')
var priceTypeSchema = new mongoose.Schema({
    priceTypeCode: String,
    priceTypeName: String,
    priceTypeIntro: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean,
    priceTypeIntros:[]
});
var PriceType =mongoose.model('PriceType',priceTypeSchema,'priceType');

module.exports = PriceType;