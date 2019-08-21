var mongoose = require('mongoose')

var carTransTypeSchema = new mongoose.Schema({
    carTransTypeCode:String,
    carTransTypeName:String,
    carTransTypeIntro: Number,
    lang: String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    carTransImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    carTransImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    carTransTypeIntros:[]
});
var CarTransType =mongoose.model('CarTransType',carTransTypeSchema,'carTransType');

module.exports = CarTransType;