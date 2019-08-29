var mongoose = require('mongoose')
var ctaSchema = new mongoose.Schema({
    ctaCode: String,
    ctaName: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean,
    ctaIntros:[]
});
var Cta =mongoose.model('Cta',ctaSchema,'cta');

module.exports = Cta;