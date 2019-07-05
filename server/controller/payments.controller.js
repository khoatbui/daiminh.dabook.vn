var Payments = require('../models/payments.model')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    Payments.find().then(function(payments){
        res.send(payments)
    })
};

module.exports.getPayments=(req,res,next) => {
    Payments.find().then(function(payments){
        res.send(payments)
    })
};

module.exports.deletePayments= function (req, res) {
    Payments.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPayments= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Payments.create(req.body, function (err, payments) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(payments)
        }
        })
};

module.exports.updatePayments=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Payments.updateOne({ _id: req.params._id },{$set:req.body},(err, payments) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(payments);
                 res.status(200).send(payments);
        }
     });
};

module.exports.priceSearch=function (req, res) {
    db.get('payments')
        .filter({ paymentsCode: req.body.paymentsCode })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
};

module.exports.getPaymentsBySupplier=(req,res,next) => {
    Payments.find({supplierId:req.params.index}).then(function(payments){
        console.log(payments);
        res.send(payments)
    })
};

module.exports.getPaymentsBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Payments.find({supplierId:supp._id}).then(function(payments){
            res.send(payments)
        })
    })
};

