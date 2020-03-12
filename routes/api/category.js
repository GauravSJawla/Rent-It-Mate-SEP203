const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator/check');

const Category = require('../../models/Category');

// @route   POST api/category
// @desc    Create a category
// @access  Private

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    let category = await Category.findOne({ name });

    if (category) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Category already exists!' }] });
    }

    //create
    category = new Category({ name: name });

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
