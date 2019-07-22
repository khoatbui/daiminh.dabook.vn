var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    fullName:String,
    userEmail:String,
    team:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var User =mongoose.model('User',userSchema,'user');

module.exports = User;