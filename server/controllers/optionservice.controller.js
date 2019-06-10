var db = require('../db')
var OptionService = require('../models/optionservice.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    OptionService.find().then(function (optionService) {
        res.send(optionService)
    })
};

module.exports.getOptionService = (req, res, next) => {
    OptionService.find().then(function (optionService) {
        res.send(optionService)
    })
};

module.exports.deleteOptionService = function (req, res) {
    console.log(req.params._id);
    OptionService.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertOptionService = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    OptionService.create(req.body, function (err, optionService) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(optionService)
        }
    })
};

module.exports.updateOptionService = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    OptionService.updateOne({ _id: req.params._id }, { $set: req.body }, (err, optionService) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(optionService);

            res.status(200).send(optionService);
        }
    });
};
