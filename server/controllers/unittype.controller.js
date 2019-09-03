var UnitType = require('../models/unittype.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    UnitType.find().then(function(unitType){
        res.send(unitType)
    })
};
module.exports.getUsed =function(req,res){
    UnitType.find({"isUsed":true}).then(function(unitType){
        res.send(unitType)
    })
};
module.exports.getmUnitTypeById=(req,res,next) => {
    UnitType.findOne({"_id":req.params._id}).then(function(unitType){
        res.send(unitType)
    })
};

module.exports.deleteUnitType= function (req, res) {
    UnitType.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertUnitType= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        UnitType.create(req.body, function (err, unitType) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(unitType)
        }
        })
};

module.exports.updateUnitType=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        UnitType.updateOne({ _id: req.params._id },{$set:req.body},(err, unitType) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(unitType);
                 res.status(200).send(unitType);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getUnitTypeBySupplier=(req,res,next) => {
    UnitType.find({supplierId:req.params.index}).then(function(unitType){
        console.log(unitType);
        res.send(unitType)
    })
};

module.exports.getUnitTypeBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        UnitType.find({supplierId:supp._id}).then(function(unitType){
            res.send(unitType)
        })
    })
};

