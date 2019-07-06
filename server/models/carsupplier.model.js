var mongoose = require('mongoose')

var carsupplierSchema = new mongoose.Schema({
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
var CarSupplier =mongoose.model('CarSupplier',carsupplierSchema,'carSupplier');

module.exports = CarSupplier;