var mongoose = require('mongoose')

var productCategorySchema = new mongoose.Schema({
    productSupplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSupplier' },
    productCategoryCode: String,
    productCategoryName: String,
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
    productCategoryImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    productCategoryImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var ProductCategory =mongoose.model('ProductCategory',productCategorySchema,'productCategory');

module.exports = ProductCategory;