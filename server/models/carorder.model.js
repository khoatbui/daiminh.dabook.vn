var mongoose = require("mongoose");
var carOrderSchema = new mongoose.Schema({
  transactionCode: String,
  selectedDate: {
    startDate: Date,
    endDate: Date
  },
  customer: {
    fullName: String,
    email: String,
    phone: String,
    pickup:String,
    question: String
  },
  supplier: {},
  carType: {},
  trip: {},
  totalPrice:Number,
  status:String,
  replyTime:Date
});
var CarOrder = mongoose.model("CarOrder", carOrderSchema, "carOrder");

module.exports = CarOrder;
