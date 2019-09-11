var mongoose = require('mongoose')

var productSupplierSchema = new mongoose.Schema({
    productSupplierCode: String,
    productSupplierName: String,
    markUpPlus:Number,
    markUpPercent:Number,
    isPromote:Boolean,
    isUsed:Boolean,
    lang: String,
    isActive:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    productSupplierImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    productSupplierImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var ProductSupplier =mongoose.model('ProductSupplier',productSupplierSchema,'productSupplier');

module.exports = ProductSupplier;