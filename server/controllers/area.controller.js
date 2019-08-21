var Area = require('../models/area.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Area.find().then(function(area){
        res.send(area)
    })
};
module.exports.getUsed =function(req,res){
    Area.find({"isUsed":true}).then(function(area){
        res.send(area)
    })
};

module.exports.getmAreaById=(req,res,next) => {
    Area.findOne({"_id":req.params._id}).then(function(area){
        res.send(area)
    })
};

module.exports.deleteArea= function (req, res) {
    Area.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertArea= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Area.create(req.body, function (err, area) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(area)
        }
        })
};

module.exports.updateArea=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Area.updateOne({ _id: req.params._id },{$set:req.body},(err, area) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(area);
                 res.status(200).send(area);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getAreaBySupplier=(req,res,next) => {
    Area.find({supplierId:req.params.index}).then(function(area){
        console.log(area);
        res.send(area)
    })
};

module.exports.getAreaBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Area.find({supplierId:supp._id}).then(function(area){
            res.send(area)
        })
    })
};

