var mongoose = require("mongoose");
var hotelOrderSchema = new mongoose.Schema({
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
    less12: Number,
    golfer: Number,
    nongolfer: Number
  },
  supplier: {},
  hotel: {},
  package: {},
  roomType: {},
  optionService: [],
  price: {
    packagePrice: Number,
    optionServicePrice: Number,
    childPrice: Number,
    totalPrice: Number
  },
  status:String,
  replyTime:Date
});
var HotelOrder = mongoose.model("HotelOrder", hotelOrderSchema, "hotelOrder");

module.exports = HotelOrder;
