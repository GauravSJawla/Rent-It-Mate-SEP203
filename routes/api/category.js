const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');
const Category = require('../../models/Category');
const SubCategory = require('../../models/SubCategory');

// @route   POST api/category
// @desc    Create a category
// @access  Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    /* istanbul ignore next */
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const categoryFields = {};
  if (name) categoryFields.name = name;

  try {
    let category = await Category.findOne({ name });

    if (category) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Category already exists! Update it!' }] });
    }

    //create
    category = new Category(categoryFields);

    await category.save();
    res.json(category);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

// @route   GET api/category
// @desc    Get all categories
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

// @route   GET api/category/:category_id
// @desc    Get category by category ID
// @access  Private

router.get('/:category_id', auth, async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.category_id
    });

    if (!category) return res.status(400).json({ msg: 'Category not found!' });

    res.json(category);
  } catch (err) {
    console.error(err.message);
    /* istanbul ignore next */
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Category not found!' });
    }
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

// @route   POST api/category/:category_id
// @desc    Update a category by category ID
// @access  Private

router.post('/:category_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    /* istanbul ignore next */
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const categoryFields = {};
  if (name) categoryFields.name = name;

  try {
    let category = await Category.findOne({ _id: req.params.category_id });

    if (category) {
      //Update
      category = await Category.findOneAndUpdate(
        { _id: req.params.category_id },
        { $set: categoryFields },
        { new: true }
      );
      return res.json(category);
    }
  } catch (err) {
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/category/:category_id
// @desc    Delete category by category ID
// @access  Private

router.delete('/:category_id', auth, async (req, res) => {
  try {
    const subcategory = await SubCategory.find({categoryId:req.params.category_id})
    if(subcategory){
      return res.json({msg:'Category has sub categories available and hence cannot be deleted!'})
    }
    await Category.findOneAndRemove({
      _id: req.params.category_id
    });
    res.json({ msg: 'Category deleted' });
  } catch (err) {
    console.log('delete error',err);
    /* istanbul ignore next */
    res.status(500).send('Server Error');
  }
});

module.exports = router;
