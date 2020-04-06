const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    categoryId: {
        type: ObjectId,
        ref: 'Category',
        required: true
      },
    updatedDate: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = SubCategory = mongoose.model('subcategory', SubCategorySchema);
  