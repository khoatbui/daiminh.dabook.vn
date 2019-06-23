module.exports.requireLogin =function(req,res,next){
    if (req.cookies.userEmail) {
        console.log(req.cookies.userEmail)
        res.redirect('/')
    }
    else{
        console.log('fail')
    }
}