var mongoose = require('mongoose')
var miceSchema = new mongoose.Schema({
    miceCode: String,
    miceName: String,
    miceNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    miceImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number,
    keyword:String
});
var MICE =mongoose.model('MICE',miceSchema,'mice');

module.exports = MICE;