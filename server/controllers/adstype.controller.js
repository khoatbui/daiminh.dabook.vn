var AdsType = require('../models/adstype.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    AdsType.find().then(function(adsType){
        res.send(adsType)
    })
};
module.exports.getUsed =function(req,res){
    AdsType.find({'isUsed':true}).then(function(adsType){
        res.send(adsType)
    })
};
module.exports.getmAdsTypeById=(req,res,next) => {
    AdsType.findOne({"_id":req.params._id}).then(function(adsType){
        res.send(adsType)
    })
};

module.exports.deleteAdsType= function (req, res) {
    AdsType.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAdsType= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        AdsType.create(req.body, function (err, adsType) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(adsType)
        }
        })
};

module.exports.updateAdsType=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        AdsType.updateOne({ _id: req.params._id },{$set:req.body},(err, adsType) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(adsType);
                 res.status(200).send(adsType);
        }
     });
};

module.exports.getAdsTypeBySupplier=(req,res,next) => {
    AdsType.find({supplierId:req.params.index}).then(function(adsType){
        console.log(adsType);
        res.send(adsType)
    })
};

module.exports.getAdsTypeBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        AdsType.find({supplierId:supp._id}).then(function(adsType){
            res.send(adsType)
        })
    })
};

