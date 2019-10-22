var mongoose = require('mongoose')
var reviewsbookingrelSchema = new mongoose.Schema({
    bookingCode: String,
    reviewURL: String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean,
    isActive:Boolean
});
var ReviewsBookingREL =mongoose.model('ReviewsBookingREL',reviewsbookingrelSchema,'reviewsbookingrel');

module.exports = ReviewsBookingREL;