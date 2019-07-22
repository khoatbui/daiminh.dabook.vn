var mongoose = require('mongoose')

var tourTypeSchema = new mongoose.Schema({
    tourTypeCode: String,
    tourTypeName: String,
    isPromote:Boolean,
    lang: String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var TourType =mongoose.model('TourType',tourTypeSchema,'tourtype');

module.exports = TourType;