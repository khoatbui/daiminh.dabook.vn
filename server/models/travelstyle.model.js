var mongoose = require('mongoose')
var travelStyleSchema = new mongoose.Schema({
    travelStyleCode: String,
    travelStyleName: String,
    travelStyleNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    travelStyleImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number,
    keyword:String
});
var TravelStyle =mongoose.model('TravelStyle',travelStyleSchema,'travelstyle');

module.exports = TravelStyle;