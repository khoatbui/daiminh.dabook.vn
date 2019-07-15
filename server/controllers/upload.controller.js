require('dotenv').config();
var clientPath=process.env.CLIENT_PATH

module.exports.uploadRoomTypeImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
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
module.exports.uploadHotelImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/hotel/hotel');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/hotel');
      result.push({'fileName':element.filename,'filePath':`img/hotel/hotel/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}
module.exports.uploadSupplierImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/hotel/supplier');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/supplier');
      result.push({'fileName':element.filename,'filePath':`img/hotel/supplier/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadCarSupplierImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/car/supplier');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/car/supplier');
      result.push({'fileName':element.filename,'filePath':`img/car/supplier/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadCarTypeImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/car/cartype');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/car/cartype');
      result.push({'fileName':element.filename,'filePath':`img/car/cartype/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadCityImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/city');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/city');
      result.push({'fileName':element.filename,'filePath':`img/tour/city/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadAreaImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/area');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/area');
      result.push({'fileName':element.filename,'filePath':`img/tour/area/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadCountryImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/country');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/country');
      result.push({'fileName':element.filename,'filePath':`img/tour/country/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadDestinationImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/destination');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/destination');
      result.push({'fileName':element.filename,'filePath':`img/tour/destination/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadTravelStyleImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/travelstyle');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/travelstyle');
      result.push({'fileName':element.filename,'filePath':`img/tour/travelstyle/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.uploadTourListImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/tourlist');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/tourlist');
      result.push({'fileName':element.filename,'filePath':`img/tour/tourlist/${element.filename}`,'destination':element.destination})
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
  //   if (!fs.existsSync(mkdireciton)){
  //     fs.mkdirSync(mkdireciton,{ recursive: true });
  //     console.log('success' + mkdireciton)
  // }
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var source = fs.createReadStream(file);
    var dest = fs.createWriteStream(path.resolve(dir2, f));
  
    source.pipe(dest);
    source.on('end', function() { console.log('Succesfully copied'); });
    source.on('error', function(err) { console.log(err); });
  };

  module.exports.removeImage = function(imageList) {
    try {
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
      
  } catch (error) {
    
  }
  };