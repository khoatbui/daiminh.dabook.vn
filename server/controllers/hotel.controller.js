var Hotel = require('../models/hotels.model')
var Supplier=require('../models/supplier.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    Hotel.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getUsed =function(req,res){
    Hotel.find({"isUsed":true}).populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getHotel=(req,res,next) => {
    Hotel.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.deleteHotel= function (req, res) {
    Hotel.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertHotel= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Hotel.create(req.body, function (err, hotel) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(hotel)
        }
        })
};

module.exports.updateHotel=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Hotel.updateOne({ _id: req.params._id },{$set:req.body},(err, hotel) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(hotel);
                 res.status(200).send(hotel);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getHotelBySupplier=(req,res,next) => {
    Hotel.find({supplierId:req.params.index,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};

module.exports.getHotelBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Hotel.find({supplierId:supp._id,isUsed:true}).then(function(hotel){
            res.send(hotel)
        })
    })
};

module.exports.getPromoteHotelBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Hotel.find({supplierId:supp._id,isPromote:true}).then(function(hotel){
            console.log(hotel);
            res.send(hotel)
        })
    })
};


module.exports.getmListHotelWithPromotion=(req,res,next) => {
    Hotel.find({isPromote:true,isUsed:true}).populate('cityId').populate('supplierId').then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmHotelById=(req,res,next) => {
    Hotel.findOne({'_id':req.params._id,isUsed:true}).populate('cityId').populate('supplierId').then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotel=(req,res,next) => {
    Hotel.find({isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotelPromotionBySupplier=(req,res,next) => {
    Hotel.find({supplierId:req.params._id,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};

module.exports.getmPromotionHotelBySearch=(req,res,next) => {
    Hotel.find({isPromote:true,isUsed:true,keyword: { $regex: req.body.keyword, $options: 'i' }}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmHotelBySearch=(req,res,next) => {
    Hotel.find({isUsed:true}).populate('cityId').populate('supplierId').then(function(hotel){
        var result=hotel.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.cityId.cityName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        console.log(hotel);
        res.send(result)
    })
};
function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }