var express = require('express');
var router = express.Router();
const Phone = require('../models/Phone');

/* Find one device for print */
router.get('/print/:id', async function(req, res, next) {
    const device = await Phone.findById(req.params.id);
res.render('devicePrint', { title: 'print a Device', msg: '', device: device });
});


module.exports = router;
