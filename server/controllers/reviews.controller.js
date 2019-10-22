var Reviews = require('../models/reviews.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Reviews.find().then(function(reviews){
        res.send(reviews)
    })
};
module.exports.getUsed =function(req,res){
    Reviews.find({"isUsed":true}).then(function(reviews){
        res.send(reviews)
    })
};

module.exports.getmReviewsById=(req,res,next) => {
    Reviews.findOne({"_id":req.params._id}).then(function(reviews){
        res.send(reviews)
    })
};
module.exports.getReviewsByBooking=(req,res,next) => {
    Reviews.find({"bookingCode":req.params._id}).then(function(reviews){
        res.send(reviews)
    })
};

module.exports.deleteReviews= function (req, res) {
    Reviews.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertReviews= function (req, res) {
    req.body.createDate=new Date();
        Reviews.create(req.body, function (err, reviews) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(reviews)
        }
        })
};

module.exports.updateReviews=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Reviews.updateOne({ _id: req.params._id },{$set:req.body},(err, reviews) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(reviews);
                 res.status(200).send(reviews);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

