var mongoose = require('mongoose')

var supplierSchema = new mongoose.Schema({
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
    supplierImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    supplierImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var Supplier =mongoose.model('Supplier',supplierSchema,'supplier');

module.exports = Supplier;