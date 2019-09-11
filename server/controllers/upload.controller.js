require('dotenv').config();
var clientPath=process.env.CLIENT_PATH
var pathFile = require('path')
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
module.exports.webpuploadRoomTypeImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/hotel/roomtype');
      result.push({'fileName':element.filename,'filePath':`webmp/img/hotel/roomtype/${element.filename}`,'destination':element.destination})
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
module.exports.uploadAdsTypeImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/ads/adstype');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/ads/adstype');
        result.push({'fileName':element.filename,'filePath':`img/ads/adstype/${element.filename}`,'destination':element.destination})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadAdsListImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/ads/adslist');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/ads/adslist');
        result.push({'fileName':element.filename,'filePath':`img/ads/adslist/${element.filename}`,'destination':element.destination})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadAdsDetailImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/ads/adsdetail');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/ads/adsdetail');
        result.push({'fileName':element.filename,'filePath':`img/ads/adsdetail/${element.filename}`,'destination':element.destination})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
module.exports.webpuploadHotelImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/hotel/hotel');
      result.push({'fileName':element.filename,'filePath':`webmp/img/hotel/hotel/${element.filename}`,'destination':element.destination})
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

module.exports.webpuploadSupplierImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/hotel/supplier');
      result.push({'fileName':element.filename,'filePath':`webmp/img/hotel/supplier/${element.filename}`,'destination':element.destination})
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
module.exports.webpuploadCarSupplierImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/webmp/img/car/supplier');
        result.push({'fileName':element.filename,'filePath':`webmp/img/car/supplier/${element.filename}`,'destination':element.destination})
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
module.exports.webpuploadCarTypeImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/webmp/img/car/cartype');
        result.push({'fileName':element.filename,'filePath':`webmp/img/car/cartype/${element.filename}`,'destination':element.destination})
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
module.exports.uploadBlogListImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/blog/bloglist');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/blog/bloglist');
        result.push({'fileName':element.filename,'filePath':`img/blog/bloglist/${element.filename}`,'destination':element.destination})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
module.exports.webpuploadCityImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/city');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/city/${element.filename}`,'destination':element.destination})
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
module.exports.webpuploadAreaImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/area');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/area/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}
module.exports.uploadAreaCountryImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/areacountry');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/areacountry');
      result.push({'fileName':element.filename,'filePath':`img/tour/areacountry/${element.filename}`,'destination':element.destination})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.webpuploadAreaCountryImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/areacountry');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/areacountry/${element.filename}`,'destination':element.destination})
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
module.exports.webpuploadCountryImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/country');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/country/${element.filename}`,'destination':element.destination})
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
module.exports.webpuploadDestinationImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/destination');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/destination/${element.filename}`,'destination':element.destination})
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
      result.push({'fileName':element.filename,'filePath':`img/tour/tourlist/${element.filename}`,'destination':element.destination,'src':`img/tour/tourlist/${element.filename}`})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}

module.exports.webpuploadTourListImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.files)
     req.files.forEach(element => {
  copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/tourlist');
      result.push({'fileName':element.filename,'filePath':`webmp/img/tour/tourlist/${element.filename}`,'destination':element.destination,'src':`img/tour/tourlist/${element.filename}`})
  });
  console.log(result);
  res.json({'files':result});
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}
  module.exports.uploadAdsImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/ads');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/ads');
        result.push({'fileName':element.filename,'filePath':`img/ads/${element.filename}`,'destination':element.destination,'src':`img/ads/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }

  module.exports.uploadTourSupplierImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/tour/supplier');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/supplier');
        result.push({'fileName':element.filename,'filePath':`img/tour/supplier/${element.filename}`,'destination':element.destination,'src':`img/tour/supplier/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadProductSupplierImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/product/supplier');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/product/supplier');
        result.push({'fileName':element.filename,'filePath':`img/product/supplier/${element.filename}`,'destination':element.destination,'src':`img/product/supplier/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadProductCategoryImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/product/category');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/product/category');
        result.push({'fileName':element.filename,'filePath':`img/product/category/${element.filename}`,'destination':element.destination,'src':`img/product/category/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.webpuploadTourSupplierImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/webmp/img/tour/supplier');
        result.push({'fileName':element.filename,'filePath':`webmp/img/tour/supplier/${element.filename}`,'destination':element.destination,'src':`webmp/img/tour/supplier/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadTourDocumentImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/file/tour/document');
    copyFile(element.path, '../m.daiminh.dabook.vn/file/tour/document');
        result.push({'fileName':element.filename,'filePath':`file/tour/document/${element.filename}`,'destination':element.destination,'src':`file/tour/document/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }

  module.exports.uploadMICEImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/tour/mice');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/mice');
        result.push({'fileName':element.filename,'filePath':`img/tour/mice/${element.filename}`,'destination':element.destination,'src':`img/tour/mice/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadAboutUsImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/page/aboutus');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/page/aboutus');
        result.push({'fileName':element.filename,'filePath':`img/page/aboutus/${element.filename}`,'destination':element.destination,'src':`img/page/aboutus/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadTravelServiceImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/tour/travelservice');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/travelservice');
        result.push({'fileName':element.filename,'filePath':`img/tour/travelservice/${element.filename}`,'destination':element.destination,'src':`img/tour/travelservice/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadFITImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/tour/fit');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/fit');
        result.push({'fileName':element.filename,'filePath':`img/tour/fit/${element.filename}`,'destination':element.destination,'src':`img/tour/fit/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadPaymentImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.files)
       req.files.forEach(element => {
    copyFile(element.path, '../daiminh.dabook.vn/img/page/payment');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/page/payment');
        result.push({'fileName':element.filename,'filePath':`img/page/payment/${element.filename}`,'destination':element.destination,'src':`img/page/payment/${element.filename}`})
    });
    console.log(result);
    res.json({'files':result});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
//   =========================================
module.exports.uploadBlogDetailIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/blog/blogdetail/blogdetailintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/blog/blogdetail/blogdetailintro');
    result.push({'fileName':element.filename,'filePath':`img/blog/blogdetail/blogdetailintro/${element.filename}`,'destination':element.destination,'src':`img/blog/blogdetail/blogdetailintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
module.exports.uploadFITIntroImg=async (req, res) => {
  try {
      var result=[];
     console.log(req.file)
     var element=req.file;
  copyFile(element.path, '../daiminh.dabook.vn/img/tour/fit/fitintro');
  copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/fit/fitintro');
  result.push({'fileName':element.filename,'filePath':`img/tour/fit/fitintro/${element.filename}`,'destination':element.destination,'src':`img/tour/fit/fitintro/${element.filename}`})
  console.log(result);
  res.json(result);
  } catch (err) {
      console.log(err);
      res.sendStatus(400);
  }
}
module.exports.uploadTourDetailImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/tour/tourdetail');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/tour/tourdetail');
    result.push({'fileName':element.filename,'filePath':`img/tour/tourdetail/${element.filename}`,'destination':element.destination,'src':`img/tour/tourdetail/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadCarTypeIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/car/cartype/cartypeintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/car/cartype/cartypeintro');
    result.push({'fileName':element.filename,'filePath':`img/car/cartype/cartypeintro/${element.filename}`,'destination':element.destination,'src':`img/car/cartype/cartypeintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  module.exports.uploadCarTransTypeIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/car/trans/cartranstypeintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/car/trans/cartranstypeintro');
    result.push({'fileName':element.filename,'filePath':`img/car/trans/cartranstypeintro/${element.filename}`,'destination':element.destination,'src':`img/car/trans/cartranstypeintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }

  module.exports.uploadCarTripIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/car/trip/tripintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/car/trip/tripintro');
    result.push({'fileName':element.filename,'filePath':`img/car/trip/tripintro/${element.filename}`,'destination':element.destination,'src':`img/car/trip/tripintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }

  module.exports.uploadHotelIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/hotel/hotel/hotelintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/hotel/hotelintro');
    result.push({'fileName':element.filename,'filePath':`img/hotel/hotel/hotelintro/${element.filename}`,'destination':element.destination,'src':`img/hotel/hotel/hotelintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }

  
  module.exports.uploadRoomTypeIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/hotel/roomtype/roomtypeintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/roomtype/roomtypeintro');
    result.push({'fileName':element.filename,'filePath':`img/hotel/roomtype/roomtypeintro/${element.filename}`,'destination':element.destination,'src':`img/hotel/roomtype/roomtypeintro/${element.filename}`})
    console.log(result);
    res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
  }
  
  module.exports.uploadPackageIntroImg=async (req, res) => {
    try {
        var result=[];
       console.log(req.file)
       var element=req.file;
    copyFile(element.path, '../daiminh.dabook.vn/img/hotel/package/packageintro');
    copyFile(element.path, '../m.daiminh.dabook.vn/img/hotel/package/packageintro');
    result.push({'fileName':element.filename,'filePath':`img/hotel/package/packageintro/${element.filename}`,'destination':element.destination,'src':`img/hotel/package/packageintro/${element.filename}`})
    console.log(result);
    res.json(result);
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
  
  module.exports.removeImageWebp = function(imageList) {
    try {
    //include the fs, path modules
    var fs = require("fs");
  
    imageList.forEach(element => {
        try {
            fs.unlinkSync(`../daiminh.dabook.vn/${element.filePath}`);
            //file removed
          } catch(err) {
          }
    });
      
  } catch (error) {
    
  }
  };