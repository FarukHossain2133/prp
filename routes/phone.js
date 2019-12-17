var express = require('express');
var router = express.Router();
const Phone = require('../models/Phone');

/* GET All Phone. */
router.get('/', async function(req, res, next) {
    const phone = await Phone.find({});
    // res.status(200).json(phone)
  res.render('phone', { title: 'Get All Devices', msg: '' });
});


/* Post a Phone. */
router.post('/', async function(req, res, next) {
    const addPhone = new Phone({...req.body});
    await addPhone.save();
    res.render('phone', { title: 'Add a  Devices', msg: 'New Device added successfully' });
});


module.exports = router;
