var mongoose = require('mongoose')
var reviewsbookingrelhisSchema = new mongoose.Schema({
    action:String,
    maker:String,
    bookingCode: String,
    reviewURL: String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean
});
var ReviewsBookingRELHIS =mongoose.model('ReviewsBookingRELHIS',reviewsbookingrelhisSchema,'reviewsbookingrelhis');

module.exports = ReviewsBookingRELHIS;