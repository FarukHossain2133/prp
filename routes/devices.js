var express = require('express');
var router = express.Router();
const Phone = require('../models/Phone');


// @route   GET devices
// @desc    Get All Devices
// @access  public
router.get('/', async function(req, res, next) {
        var perPage = 10;
        var page = req.params.page || 1;
        try {
           const data = await Phone.find({})
                .sort({date: -1})
                .skip((perPage * page) - perPage)
                .limit(perPage).exec();

            const count = await Phone.countDocuments({}).exec()    

            res.render('devices', { devices: data,
            current: page,
            count: count,
            pages: Math.ceil(count / perPage),
            title: 'Get All Devices',
            msg: '' });
          
        } catch (error) {
          console.error(error.message)
          res.status(500).json("server error");
        }   
});



// @route   GET devices/:page
// @desc    Get All Devices page view
// @access  public
router.get('/:page', async function(req, res, next) {
      var perPage = 10;
      var page = req.params.page || 1;

    try{
        const data = await Phone.find({})
                  .sort({date: -1})
                  .skip((perPage * page) - perPage)
                  .limit(perPage).exec();

        const count = await Phone.countDocuments({}).exec()    

        res.render('devices', { devices: data,
        current: page,
        count: count,
        pages: Math.ceil(count / perPage),
        title: 'Get All Devices',
        msg: '' });

    } catch (error) {
        console.error(error.message)
        res.status(500).json("server error");
    }  
  });


// @route   GET devices/delete/:id
// @desc    Get A Device And Delete
// @access  public
router.get('/delete/:id', async function(req, res, next) {
    var perPage = 10;
    var page = req.params.page || 1;

    try{
      await Phone.findByIdAndDelete(req.params.id);
      const data = await Phone.find({})
              .sort({date: -1})
              .skip((perPage * page) - perPage)
              .limit(perPage).exec();

      const count = await Phone.countDocuments({}).exec()    

      res.render('devices', { devices: data,
      current: page,
      count: count,
      pages: Math.ceil(count / perPage),
      title: 'Get All Devices',
      msg: 'Device Deleted' });
  } catch (error) {
      console.error(error.message)
      res.status(500).json("server error");
  }  
});

// @route   GET devices/update/:id
// @desc    Get A Device And Update
// @access  public
router.get('/update/:id', async function(req, res, next) {
    const device = await Phone.findById(req.params.id);
res.render('device', { title: 'Get a Device', msg: '', device: device });
});

/* Edit a Device. */
router.post('/update/:id', async function(req, res, next) {
        var perPage = 10;
        var page = req.params.page || 1;

        try{
          await Phone.findByIdAndUpdate(req.params.id, {...req.body});
          const data = await Phone.find({})
                  .sort({date: -1})
                  .skip((perPage * page) - perPage)
                  .limit(perPage).exec();

          const count = await Phone.countDocuments({}).exec()    

          res.render('devices', { devices: data,
          current: page,
          count: count,
          pages: Math.ceil(count / perPage),
          title: 'Get All Devices',
          msg: 'Updated Successfully' });
      } catch (error) {
          console.error(error.message)
          res.status(500).json("server error");
    }  
});

// @route   GET devices/filter
// @desc    Filtering Devices
// @access  public
router.post('/filter', async function(req, res, next){
    const key = req.body.key;
    const value = req.body.value;
    var perPage = 10;
    var page = req.params.page || 1;

  try{
    const data = await Phone.find({[key]: value})
            .sort({date: -1})
            .skip((perPage * page) - perPage)
            .limit(perPage).exec();

    const count = await Phone.countDocuments({}).exec();    

    res.render('devices', { devices: data,
    current: page,
    count: count,
    pages: Math.ceil(count / perPage),
    title: 'Get All Devices',
    msg: '' });
  } catch (error) {
    console.error(error.message)
    res.status(500).json("server error");
  }  
});



module.exports = router;
