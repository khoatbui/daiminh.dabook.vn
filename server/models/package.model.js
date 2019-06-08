var mongoose = require('mongoose')

var pakageSchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    packageCode:String,
    packageName:String,
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var Package =mongoose.model('Package',pakageSchema,'package');

module.exports = Package;