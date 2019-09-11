var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
  productSupplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductSupplier' },
  productCategoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  productCode: String,
  productName: String,
  productIntro: String,
  productIntros: [],
  blockIntro: {
    blockName: String,
    order: Number,
    blockIntro: String,
    lang: String
  },
  blockIntros: [],
  pricePackage: String,
  pricePackages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PricePackage' }],
  star: Number,
  keyword: String,
  isUsed: Boolean,
  isHot: Boolean,
  isPromote: Boolean,
  productImages: [
    { fileName: String, filePath: String, destination: String, size: Number }
  ],
  productImagesWebp: [
    { fileName: String, filePath: String, destination: String, size: Number }
  ],
  isPackage: Boolean,
  createBy: String,
  createDate: Date,
  modifyBy: String,
  modifyDate: Date
});
var Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;
