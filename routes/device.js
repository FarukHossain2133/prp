var express = require('express');
var router = express.Router();
const Phone = require('../models/Phone');


// @route   GET device
// @desc    Get ALL Device
// @access  public
router.get('/', async function(req, res, next) {
    const phone = await Phone.find({});
    // res.status(200).json(phone)
  res.render('phone', { title: 'Get All Devices', msg: '' });
});


// @route   POST Device
// @desc    Create A New Device
// @access  public
router.post('/', async function(req, res, next) {
    const addPhone = new Phone({...req.body});
    await addPhone.save();
    res.render('phone', { title: 'Add a  Devices', msg: 'New Device added successfully' });
});

// @route   GET device/:id
// @desc    Get A Device And Print
// @access  public
router.get('/print/:id', async function(req, res, next) {
    const device = await Phone.findById(req.params.id);
res.render('devicePrint', { title: 'print a Device', msg: '', device: device });
});


module.exports = router;
