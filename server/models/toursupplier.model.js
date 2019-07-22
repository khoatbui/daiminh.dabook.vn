var mongoose = require('mongoose')

var toursupplierSchema = new mongoose.Schema({
    supplierCode: String,
    supplierName: String,
    markUpPlus:Number,
    markUpPercent:Number,
    isPromote:Boolean,
    lang: String,
    isActive:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    supplierImages:[{fileName:String,filePath:String,destination:String,size:Number}]
});
var TourSupplier =mongoose.model('TourSupplier',toursupplierSchema,'tourSupplier');

module.exports = TourSupplier;