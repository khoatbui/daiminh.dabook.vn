var mongoose = require('mongoose')
var areaSchema = new mongoose.Schema({
    areaCode: String,
    areaName: String,
    areaNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    areaImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    areaImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    map:String
});
var Area =mongoose.model('Area',areaSchema,'area');

module.exports = Area;