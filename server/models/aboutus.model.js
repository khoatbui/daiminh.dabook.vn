var mongoose = require('mongoose')
var aboutUsSchema = new mongoose.Schema({
    aboutUsCode: String,
    aboutUsName: String,
    aboutUsNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    aboutUsImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number,
    keyword:String
});
var AboutUs =mongoose.model('AboutUs',aboutUsSchema,'aboutUs');

module.exports = AboutUs;