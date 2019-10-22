var ReviewsBookingRELHIS = require('../models/reviewsbookingrelhis.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    ReviewsBookingRELHIS.find().then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};
module.exports.getUsed =function(req,res){
    ReviewsBookingRELHIS.find({"isUsed":true}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};

module.exports.getmReviewsBookingRELHISById=(req,res,next) => {
    ReviewsBookingRELHIS.findOne({"_id":req.params._id}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};

module.exports.getmReviewsBookingRELHISByBooking=(req,res,next) => {
    ReviewsBookingRELHIS.find({"bookingCode":req.params._id}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};

module.exports.deleteReviewsBookingRELHIS= function (req, res) {
    ReviewsBookingRELHIS.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertReviewsBookingRELHIS= function (req, res) {
    req.body.createDate=new Date();
        ReviewsBookingRELHIS.create(req.body, function (err, reviewsbookingrel) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(reviewsbookingrel)
        }
        })
};

module.exports.updateReviewsBookingRELHIS=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        ReviewsBookingRELHIS.updateOne({ _id: req.params._id },{$set:req.body},(err, reviewsbookingrel) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(reviewsbookingrel);
                 res.status(200).send(reviewsbookingrel);
        }
     });
};

