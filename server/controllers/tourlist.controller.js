var TourList = require('../models/tourlist.model')
var Supplier=require('../models/supplier.model')
var Destination=require('../models/destination.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    TourList.find().populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};


module.exports.getmAllTourPromotion =function(req,res){
    TourList.find({"isPromotion":true,"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};

module.exports.getmAllTour =function(req,res){
    TourList.find({"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};
module.exports.getmAllTourByCity =function(req,res){
    var des=[];
    Destination.find({'cityId':req.params._id}).then(function(pac){
        pac.forEach(element => {
            des.push(element._id)
        });
    })
    TourList.find({"isUsed":true,'destinationId':{ $in : des }}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};
module.exports.getmAllTourBySearch =function(req,res){
    TourList.find({"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(pac){
        var result=pac.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.tourTypeId.tourTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.tourTypeId.tourTypeCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.tourCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.tourName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
};

module.exports.getmTop10AllTourPromotion =function(req,res){
    TourList.find({"isPromotion":true,"isUsed":true}).limit(10).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};

module.exports.getmTourListById=(req,res,next) => {
    TourList.findOne({"_id":req.params._id}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        res.send(tourlist)
    })
};

module.exports.deleteTourList= function (req, res) {
    TourList.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTourList= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TourList.create(req.body, function (err, tourlist) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(tourlist)
        }
        })
};

module.exports.updateTourList=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        TourList.updateOne({ _id: req.params._id },{$set:req.body},(err, tourlist) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(tourlist);
                 res.status(200).send(tourlist);
        }
     });
};

module.exports.getTourListBySupplier=(req,res,next) => {
    TourList.find({supplierId:req.params.index}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(tourlist){
        console.log(tourlist);
        res.send(tourlist)
    })
};

module.exports.getTourListBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('destinationId').populate('travelStyleId').populate('tourTypeId').then(function(supp){
        TourList.find({supplierId:supp._id}).then(function(tourlist){
            res.send(tourlist)
        })
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