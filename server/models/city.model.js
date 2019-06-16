var mongoose = require('mongoose')
var citySchema = new mongoose.Schema({
    cityCode: String,
    cityName: String,
    cityNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var City =mongoose.model('City',citySchema,'city');

module.exports = City;