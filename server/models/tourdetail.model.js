var mongoose = require('mongoose')
var tourDetailSchema = new mongoose.Schema({
    tourId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TourList' },
    program: String,
    timeLine:{
        icon:String,
        time:String,
        title:String,
        program:String,
        order:Number
    },
    content:{
        contentName:String,
        contentDetail:String,
        order:Number,
      },
    programV2:[],
    additionContents:[],
    transport: String,
    serviceInclude: String,
    serviceNotInclude:String,
    shouldTake:String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    tourDetailImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    detailDocs:[{fileName:String,filePath:String,destination:String,size:Number}],
    tourDetailImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var TourDetail =mongoose.model('TourDetail',tourDetailSchema,'tourdetail');

module.exports = TourDetail;