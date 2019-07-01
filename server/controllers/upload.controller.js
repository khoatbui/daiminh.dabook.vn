require('dotenv').config();


module.exports.uploadHotelImage =function(req,res){
    console.log(`Upload success ${req.file.path}`);
    res.json({'filepath':req.file.path});
};


module.exports.uploadRoomTypeImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
  moveFile(element.path, './upload/hotel/roomtype');
        result.push({'fileName':element.filename,'filePath':`img/hotel/roomtype/${element.filename}`,'destination':element.destination})
    });
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

//moves the $file to $dir2
var moveFile = (file, dir2)=>{
    //include the fs, path modules
    var fs = require('fs');
    var path = require('path');
  
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);
  
    fs.rename(file, dest, (err)=>{
      if(err) throw err;
      else console.log('Successfully moved');
    });
  };