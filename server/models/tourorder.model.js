var mongoose = require("mongoose");
var tourOrderSchema = new mongoose.Schema({
  transactionCode: String,
  selectedDate: {
    startDate: Date,
    endDate: Date
  },
  customer: {
    fullName: String,
    email: String,
    phone: String,
    question: String
  },
  guest: {
    adult: Number,
    less4: Number,
    less12: Number
  },
  requestData:{
    hotelStar: {},
    translate: {},
    meal: {},
  },
  destination: {},
  tour:{},
  price:Number,
  status:String,
  replyTime:Date
});
var TourOrder = mongoose.model("TourOrder", tourOrderSchema, "tourOrder");

module.exports = TourOrder;
