var mongoose = require('mongoose')

var pakageHotelRELSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    price: Number,
    less4Price: Number,
    less12Price: Number,
    more12Price: Number,
    lang: String,
    note: String,
    isUsed: Boolean,
    isAllDays:Boolean,
    isDefault: Boolean,
    startDate: Date,
    endDate: Date,
    markUpPlus: Number,
    markUpPercent: Number,
    priceRanges: [{
        price: Number,
        markUpPercent: Number,
        markUpPlus: Number,
        less4Price: Number,
        less12Price: Number,
        more12Price: Number,
        startDate: Date,
        endDate: Date, 
        isUsed: Boolean,
        isAllDays:Boolean,
        days:[{
            selected:Boolean,
            dayCode:Number,
            shortDay:String,
            day:String,
        }]
    }],
    optionService:{
        optionPrice: Number,
        optionServiceCode: String,
        optionServiceName: String,
        optionNote: String,
        isUsed: Boolean
    }
    ,
    optionServices: [],
    utilities:{
        isWifi:Boolean,
        isTivi:Boolean,
        isSwim:Boolean,
        isGym:Boolean,
        isKitchen:Boolean,
        isDry:Boolean
      },
    maxAdult: Number,
    createBy: String,
    createDate: Date,
    modifyBy: String,
    modifyDate: Date,
    isPromote:Boolean
});
var PackageHotelREL = mongoose.model('PackageHotelREL', pakageHotelRELSchema, 'packageHotelREL');

module.exports = PackageHotelREL;