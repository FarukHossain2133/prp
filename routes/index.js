var express = require('express');
var router = express.Router();

// @route   GET /
// @desc    Application Home Page
// @access  public
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Repair Shop'});
});

module.exports = router;
