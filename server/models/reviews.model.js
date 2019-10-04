var mongoose = require('mongoose')
var reviewsSchema = new mongoose.Schema({
    bookingCode: String,
    customerName: String,
    customerEmail: String,
    voteScore:Number,
    reviews:String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean
});
var Reviews =mongoose.model('Reviews',reviewsSchema,'reviews');

module.exports = Reviews;