var mongoose = require('mongoose')
var adsSchema = new mongoose.Schema({
    adsCode: String,
    adsName: String,
    adsNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    adsImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    adsType:String,
    adsLink: String,
    adsTitle:String,
    adsIntro:String,
    adsLinkMobile:String,
    startDate: Date,
    endDate: Date,
    isUsed: Boolean,
    isHot: Boolean,
    adsIntros: []
});
var Ads =mongoose.model('Ads',adsSchema,'ads');

module.exports = Ads;