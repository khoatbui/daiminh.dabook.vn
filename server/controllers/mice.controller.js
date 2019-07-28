var MICE = require('../models/mice.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    MICE.find().then(function(mice){
        res.send(mice)
    })
};

module.exports.getmMICEById=(req,res,next) => {
    MICE.findOne({"_id":req.params._id}).then(function(mice){
        res.send(mice)
    })
};

module.exports.deleteMICE= function (req, res) {
    MICE.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertMICE= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        MICE.create(req.body, function (err, mice) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(mice)
        }
        })
};

module.exports.updateMICE=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        MICE.updateOne({ _id: req.params._id },{$set:req.body},(err, mice) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(mice);
                 res.status(200).send(mice);
        }
     });
};

module.exports.getMICEBySupplier=(req,res,next) => {
    MICE.find({supplierId:req.params.index}).then(function(mice){
        console.log(mice);
        res.send(mice)
    })
};

module.exports.getMICEBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        MICE.find({supplierId:supp._id}).then(function(mice){
            res.send(mice)
        })
    })
};

