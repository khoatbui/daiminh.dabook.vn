var mongoose = require('mongoose')
var countrySchema = new mongoose.Schema({
    areaId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    countryCode: String,
    countryName: String,
    countryNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    countryImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    countryImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    map:String
});
var Country =mongoose.model('Country',countrySchema,'country');

module.exports = Country;