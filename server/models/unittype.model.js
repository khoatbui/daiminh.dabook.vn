var mongoose = require('mongoose')
var unitTypeSchema = new mongoose.Schema({
    unitTypeCode: String,
    unitTypeName: String,
    unitTypeIntro: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean,
    unitTypeIntros:[]
});
var UnitType =mongoose.model('UnitType',unitTypeSchema,'unitType');

module.exports = UnitType;