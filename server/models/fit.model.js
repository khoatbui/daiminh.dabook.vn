var mongoose = require('mongoose')
var fitSchema = new mongoose.Schema({
    fitCode: String,
    fitName: String,
    fitIntro: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    fitImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    fitImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number,
    keyword:String,
    fitIntros:[]
});
var FIT =mongoose.model('FIT',fitSchema,'fit');

module.exports = FIT;