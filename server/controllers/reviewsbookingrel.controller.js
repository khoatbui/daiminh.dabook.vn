var ReviewsBookingREL = require('../models/reviewsbookingrel.model')
var ReviewsBookingRELHIS = require('../models/reviewsbookingrelhis.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

function CreateReviewsBookingRELHIS(reviewREL,hisType){
    var reviewHist={
        action:hisType,
        maker:reviewREL.modifyBy,
        bookingCode: reviewREL.bookingCode,
        reviewURL: reviewREL.reviewURL,
        createBy:reviewREL.createBy,
        createDate:reviewREL.createDate,
        modifyBy:reviewREL.modifyBy,
        modifyDate:reviewREL.modifyDate,
        isUsed:BooleareviewREL.isUsed
    }
    ReviewsBookingRELHIS.create(reviewHist, function (err, hist) {
        if (err){
            console.log(err);
        } 
        else{
            console.log('Success');
        }
        })
}

module.exports.index =function(req,res){
    ReviewsBookingREL.find().then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};
module.exports.getUsed =function(req,res){
    ReviewsBookingREL.find({"isUsed":true}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};
module.exports.getActive =function(req,res){
    ReviewsBookingREL.find({"isActive":true}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};
module.exports.getmReviewsBookingRELById=(req,res,next) => {
    ReviewsBookingREL.findOne({"_id":req.params._id}).then(function(reviewsbookingrel){
        res.send(reviewsbookingrel)
    })
};

module.exports.deleteReviewsBookingREL= function (req, res) {
    ReviewsBookingREL.findOne({"_id":req.params._id}).then(function(reviewsbookingrel){
        // insertReviewsBookingRELHIS(reviewsbookingrel,'DELETE');
    })
    ReviewsBookingREL.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertReviewsBookingREL= function (req, res) {
    req.body.createDate=new Date();
        ReviewsBookingREL.create(req.body, function (err, reviewsbookingrel) {
        if (err){
            console.log(err);
        } 
        else{
            // insertReviewsBookingRELHIS(reviewsbookingrel,'INSERT');
            res.send(reviewsbookingrel)
        }
        })
};

module.exports.updateReviewsBookingREL=function (req, res) {
    req.body.modifyDate=new Date();
    // insertReviewsBookingRELHIS(req.body,'UPDATE');
    delete req.body.createBy;
        ReviewsBookingREL.updateOne({ _id: req.params._id },{$set:req.body},(err, reviewsbookingrel) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(reviewsbookingrel);
                 res.status(200).send(reviewsbookingrel);
        }
     });
};
