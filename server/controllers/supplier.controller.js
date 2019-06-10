var db = require('../db')
var Supplier = require('../models/supplier.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();
module.exports.index = function (req, res) {
    Supplier.find().then(function (supplier) {
        res.send(supplier)
    })
};

module.exports.getSupplier = (req, res, next) => {
    Supplier.find().then(function (supplier) {
        res.send(supplier)
    })
};

module.exports.deleteSupplier = function (req, res) {
    console.log(req.params._id);
    Supplier.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertSupplier = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    Supplier.create(req.body, function (err, supplier) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(supplier)
        }
    })
};

module.exports.updateSupplier = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    Supplier.updateOne({ _id: req.params._id }, { $set: req.body }, (err, supplier) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(supplier);

            res.status(200).send(supplier);
        }
    });
};

