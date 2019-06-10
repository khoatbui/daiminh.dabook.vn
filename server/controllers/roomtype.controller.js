var db = require('../db')
var RoomType = require('../models/roomtype.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    RoomType.find().then(function (roomtype) {
        res.send(roomtype)
    })
};

module.exports.getRoomType = (req, res, next) => {
    RoomType.find().then(function (roomtype) {
        res.send(roomtype)
    })
};

module.exports.deleteRoomType = function (req, res) {
    console.log(req.params._id);
    RoomType.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertRoomType = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    RoomType.create(req.body, function (err, roomtype) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(roomtype)
        }
    })
};

module.exports.updateRoomType = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    RoomType.updateOne({ _id: req.params._id }, { $set: req.body }, (err, roomtype) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(roomtype);

            res.status(200).send(roomtype);
        }
    });
};

module.exports.getRoomTypeByHotel=(req,res,next) => {
    RoomType.find({hotelId:req.params.index}).then(function(roomtype){
        res.send(roomtype)
    })
};
