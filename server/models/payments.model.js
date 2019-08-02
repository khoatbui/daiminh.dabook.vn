var mongoose = require('mongoose')
var paymentSchema = new mongoose.Schema({
    bankName: String,
    bankLogo: String,
    bankOwner: String,
    bankAccount: String,
    bankLocation:String,
    note:String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    bankIntros:[],
    bankImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    order:Number

});
var Payments =mongoose.model('Payments',paymentSchema,'payments');

module.exports = Payments;