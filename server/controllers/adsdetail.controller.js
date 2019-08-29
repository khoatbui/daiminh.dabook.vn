var AdsDetail = require('../models/adsdetail.model')
var AdsList=require('../models/adslist.model')
var AdsType=require('../models/adstype.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    AdsDetail.find().populate('adsId').then(function(adsdetail){
        res.send(adsdetail)
    })
};
module.exports.getUsed =function(req,res){
    AdsDetail.find({"isUsed":true}).populate('adsId').then(function(adsdetail){
        res.send(adsdetail)
    })
  };
  
module.exports.getAdsAboutUs =function(req,res){
    AdsType.findOne({'adsTypeCode':'ABU'}).then(function(adsType){
        AdsList.find({'adsTypeId':adsType._id}).then(function(adsLists){
            var ids=[];
            adsLists.forEach(element => {
                ids.push(element._id)
            });
            console.log(ids)
            AdsDetail.find({"adsId": { $in : ids }}).populate('adsId').then(function(adsdetail){
                console.log(adsdetail)
                res.send(adsdetail)
            })
        })
    })
};
module.exports.getmAdsDetailLangById=(req,res,next) => {
    AdsDetail.findOne({"adsId":req.params._id}).populate('adsId').then(function(adsdetail){
        res.send(adsdetail)
    })
};
module.exports.getmAdsDetailById=(req,res,next) => {
    AdsDetail.find({"adsId":req.params._id}).populate('adsId').then(function(adsdetail){
        res.send(adsdetail)
    })
};
module.exports.deleteAdsDetail= function (req, res) {
    AdsDetail.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAdsDetail= function (req, res) {
    console.log('in')
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        AdsDetail.create(req.body, function (err, adsdetail) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(adsdetail)
        }
        })
};

module.exports.updateAdsDetail=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        AdsDetail.updateOne({ _id: req.params._id },{$set:req.body},(err, adsdetail) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(adsdetail);
                 res.status(200).send(adsdetail);
        }
     });
};

