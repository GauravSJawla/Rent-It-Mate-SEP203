const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { validationResult } = require("express-validator");
const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");
const Product = require('../../models/Product');

// @route   POST api/subcategory
// @access  Private

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    /* istanbul ignore next */
    return res.status(400).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const categoryId = req.body.categoryId;
  const subCategoryFields = { name, categoryId };
  if (name) subCategoryFields.name = name;
  if (categoryId) subCategoryFields.categoryId = categoryId;
  try {
    try {
      let category = await Category.findOne({ _id: categoryId });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Parent Category not found! Please Create A Category First!" }] });
    }

    let subcategory = await SubCategory.findOne({ name: name });

    if (subcategory) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Sub-Category already exists! Update it!" }] });
    }

    //create
    subcategory = new SubCategory(subCategoryFields);

    await subcategory.save();
    res.json(subcategory);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send("Server Error");
  }
});

// @route   GET api/subcategory
// @desc    Get all sub-categories
// @access  Private

router.get("/", async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send("Server Error");
  }
});

// @route   GET api/subcategory/:subcategory_id
// @desc    Get subcategory by subcategory ID
// @access  Private

router.get("/:subcategory_id", auth, async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({
      _id: req.params.subcategory_id
    });

    res.json(subcategory);
  } catch (err) {
    console.error(err.message);
    /* istanbul ignore next */
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Sub-Category not found!" });
    }
    /* istanbul ignore next */
    res.status(500).send("Server Error");
  }
});

// @route   POST api/subcategory/:subcategory_id
// @desc    Update a subcategory by subcategory ID
// @access  Private

router.post("/:subcategory_id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    /* istanbul ignore next */
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const subCategoryFields = {};
  if (name) subCategoryFields.name = name;

  try {
    let subcategory = await SubCategory.findOne({
      _id: req.params.subcategory_id
    });

    if (subcategory) {
      //Update
      subcategory = await SubCategory.findOneAndUpdate(
        { _id: req.params.subcategory_id },
        { $set: subCategoryFields },
        { new: true }
      );
      return res.json(subcategory);
    }
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/subcategory/:subcategory_id
// @desc    Delete a subcategory by subcategory ID
// @access  Private

router.delete("/:subcategory_id", auth, async (req, res) => {
  try {
    const productCount = await Product.find({subcategory:req.params.subcategory_id}).countDocuments();
    if(productCount){
      return res.json({msg:'Subcategory cannot be deleted'})
    }
    await SubCategory.findOneAndRemove({
      _id: req.params.subcategory_id
    });
    res.json({ msg: "Sub-Category has been deleted" });
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send("Server Error");
  }
});

module.exports = router;
