var mongoose = require('mongoose')
var travelServiceSchema = new mongoose.Schema({
    travelServiceCode: String,
    travelServiceName: String,
    travelServiceNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    travelServiceImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number,
    keyword:String
});
var TravelService =mongoose.model('TravelService',travelServiceSchema,'travelservice');

module.exports = TravelService;