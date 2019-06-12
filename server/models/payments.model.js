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
    modifyDate:Date
});
var Payments =mongoose.model('Payments',paymentSchema,'payments');

module.exports = Payments;