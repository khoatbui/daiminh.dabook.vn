var mongoose = require('mongoose')
var hotelOrderSchema = new mongoose.Schema({
    orderCode:String,
    productCode:String,
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    packageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    name:String,
    phone:String,
    email:String,
    motherLang:String,
    hotelCode: String,
    hotelName: String,
    supplierCode: String,
    supplierName: String,
    roomTypeCode: String,
    roomTypeName: String,
    packageCode: String,
    packageName: String,
    baseprice:Number,
    totalPrice:Number,
    guest:Number,
    children:Number,
    additionService:String,
    additionServicePrice:Number,
    childrenService:String,
    childrenServicePrice:Number,
    orderStatusId:{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' },
    star: Number,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var HotelOrder =mongoose.model('HotelOrder',hotelOrderSchema,'hotelOrder');

module.exports = HotelOrder;