var Ads = require('../models/ads.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Ads.find().then(function(ads){
        res.send(ads)
    })
};
module.exports.getUsed =function(req,res){
    Ads.find({"isUsed":true}).then(function(ads){
        res.send(ads)
    })
};
module.exports.getmAdsById=(req,res,next) => {
    Ads.findOne({"_id":req.params._id}).then(function(ads){
        res.send(ads)
    })
};
module.exports.getmAdsByType=(req,res,next) => {
    Ads.find({"adsType":req.params._id,"isUsed":true}).then(function(ads){
        res.send(ads)
    })
};
module.exports.deleteAds= function (req, res) {
    Ads.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAds= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Ads.create(req.body, function (err, ads) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(ads)
        }
        })
};

module.exports.updateAds=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        Ads.updateOne({ _id: req.params._id },{$set:req.body},(err, ads) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(ads);
                 res.status(200).send(ads);
        }
     });
};

module.exports.getAdsBySupplier=(req,res,next) => {
    Ads.find({supplierId:req.params.index}).then(function(ads){
        console.log(ads);
        res.send(ads)
    })
};

module.exports.getAdsBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Ads.find({supplierId:supp._id}).then(function(ads){
            res.send(ads)
        })
    })
};

