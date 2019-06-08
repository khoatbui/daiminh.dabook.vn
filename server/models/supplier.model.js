var mongoose = require('mongoose')

var supplierSchema = new mongoose.Schema({
    supplierCode: String,
    supplierName: String,
    lang: String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var Supplier =mongoose.model('Supplier',supplierSchema,'supplier');

module.exports = Supplier;