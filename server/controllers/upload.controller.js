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
//   moveFile(element.path, '../daiminh.dabook.vn/img/hotel/roomtype');
//   moveFile(element.path, '../m.daiminh.dabook.vn/img/hotel/roomtype');
    copyFile(element.path, '../daiminh.dabook.vn/img/hotel/roomtype');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/roomtype');
        result.push({'fileName':element.filename,'filePath':`img/hotel/roomtype/${element.filename}`,'destination':element.destination})
    });
    console.log(result);
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
      if(err) console.log(err) ;
      else console.log('Successfully moved');
    });
  };
//copy the $file to $dir2
var copyFile = (file, dir2)=>{
    //include the fs, path modules
    var fs = require('fs');
    var path = require('path');
  
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var source = fs.createReadStream(file);
    var dest = fs.createWriteStream(path.resolve(dir2, f));
  
    source.pipe(dest);
    source.on('end', function() { console.log('Succesfully copied'); });
    source.on('error', function(err) { console.log(err); });
  };

  module.exports.removeImage = function(imageList) {
    //include the fs, path modules
    var fs = require("fs");
  
    imageList.forEach(element => {
        try {
            fs.unlinkSync(`../daiminh.dabook.vn/${element.filePath}`);
            fs.unlinkSync(`../m.daiminh.dabook.vn/${element.filePath}`);
            //file removed
          } catch(err) {
          }
    });
  };