var mongoose = require('mongoose')
var citySchema = new mongoose.Schema({
    countryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    areaCountryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'AreaCountry' },
    cityCode: String,
    cityName: String,
    cityNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    cityImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    cityImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    order:Number,
    isUsed:Boolean,
    map:String
});
var City =mongoose.model('City',citySchema,'city');

module.exports = City;