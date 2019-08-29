var Cta = require('../models/cta.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Cta.find().then(function(cta){
        res.send(cta)
    })
};
module.exports.getUsed =function(req,res){
    Cta.find({"isUsed":true}).then(function(cta){
        res.send(cta)
    })
};

module.exports.getmCtaById=(req,res,next) => {
    Cta.findOne({"_id":req.params._id}).then(function(cta){
        res.send(cta)
    })
};

module.exports.deleteCta= function (req, res) {
    Cta.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertCta= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Cta.create(req.body, function (err, cta) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(cta)
        }
        })
};

module.exports.updateCta=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Cta.updateOne({ _id: req.params._id },{$set:req.body},(err, cta) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(cta);
                 res.status(200).send(cta);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getCtaBySupplier=(req,res,next) => {
    Cta.find({supplierId:req.params.index}).then(function(cta){
        console.log(cta);
        res.send(cta)
    })
};

module.exports.getCtaBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Cta.find({supplierId:supp._id}).then(function(cta){
            res.send(cta)
        })
    })
};

