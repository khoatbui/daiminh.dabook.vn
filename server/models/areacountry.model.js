var mongoose = require('mongoose')
var areaCountrySchema = new mongoose.Schema({
    countryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    areaCountryCode: String,
    areaCountryName: String,
    areaCountryIntro: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    areaCountryImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    areaCountryImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    areaCountryIntros:[],
    map:String
});
var AreaCountry =mongoose.model('AreaCountry',areaCountrySchema,'areaCountry');

module.exports = AreaCountry;