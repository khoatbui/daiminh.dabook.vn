var AdsList = require('../models/adslist.model')
var AdsType = require('../models/adstype.model')
var Supplier=require('../models/supplier.model')
var Destination=require('../models/destination.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    AdsList.find().populate('adsTypeId').then(function(adslist){
        console.log(adslist)
        res.send(adslist)
    })
};

module.exports.getUsed =function(req,res){
    AdsList.find({"isUsed":true}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
  };
module.exports.getUsedAds =function(req,res){
    AdsList.find({"isUsed":true,"isAds":true}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
  };
  module.exports.getmAdsByType =function(req,res){
    AdsType.findOne({"adsTypeCode":req.params._id,"isUsed":true}).then(function(adstype){
        
    AdsList.find({"adsTypeId":adstype._id,"isUsed":true}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
    })
};
module.exports.getmAllAdsPromotion =function(req,res){
    AdsList.find({"isPromotion":true,"isUsed":true}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};

module.exports.getmAllAds =function(req,res){
    AdsList.find({"isUsed":true}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};
module.exports.getmAllAdsByCity =function(req,res){
    var des=[];
    Destination.find({'cityId':req.params._id}).then(function(pac){
        pac.forEach(element => {
            des.push(element._id)
        });
    })
    AdsList.find({"isUsed":true,'destinationId':{ $in : des }}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};
module.exports.getmAllAdsBySearch =function(req,res){
    AdsList.find({"isUsed":true}).populate('adsTypeId').then(function(pac){
        var result=pac.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.adsTypeId.adsTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.adsTypeId.adsTypeCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.adsCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.adsName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
};

module.exports.getmTop10AllAdsPromotion =function(req,res){
    AdsList.find({"isPromotion":true,"isUsed":true}).limit(10).populate('ctaId').populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};

module.exports.getmAdsListById=(req,res,next) => {
    AdsList.findOne({"_id":req.params._id}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};

module.exports.getmAdsListByMICEId=(req,res,next) => {
    AdsList.find({"miceId":req.params._id}).populate('adsTypeId').then(function(adslist){
        res.send(adslist)
    })
};

module.exports.deleteAdsList= function (req, res) {
    AdsList.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAdsList= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
    console.log(req.body);
        AdsList.create(req.body, function (err, adslist) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(adslist)
        }
        })
};

module.exports.updateAdsList=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        AdsList.updateOne({ _id: req.params._id },{$set:req.body},(err, adslist) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(adslist);
                 res.status(200).send(adslist);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getAdsListBySupplier=(req,res,next) => {
    AdsList.find({supplierId:req.params.index}).populate('adsTypeId').then(function(adslist){
        console.log(adslist);
        res.send(adslist)
    })
};

module.exports.getAdsListBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('adsTypeId').then(function(supp){
        AdsList.find({supplierId:supp._id}).then(function(adslist){
            res.send(adslist)
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