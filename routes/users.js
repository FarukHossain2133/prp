var express = require('express');
var router = express.Router();

// @route   GET users
// @desc    Find All Users
// @access  public
router.get('/', function(req, res, next) {
  res.send('This module should update very soon for handling users');
});

module.exports = router;
