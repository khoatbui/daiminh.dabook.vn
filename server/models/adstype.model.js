var mongoose = require('mongoose')
var adsTypeSchema = new mongoose.Schema({
    adsTypeCode: String,
    adsTypeName: String,
    adsTypeNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    adsTypeImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    adsTypeImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
});
var AdsType =mongoose.model('AdsType',adsTypeSchema,'adsType');

module.exports = AdsType;