var mongoose = require('mongoose')
var orderStatusSchema = new mongoose.Schema({
    statusCode:String,
    statusName: String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var OrderStatus =mongoose.model('OrderStatus',orderStatusSchema,'orderStatus');

module.exports = OrderStatus;