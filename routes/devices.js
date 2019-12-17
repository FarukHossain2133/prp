var express = require('express');
var router = express.Router();
const Phone = require('../models/Phone');


/* GET All Device. */
router.get('/', async function(req, res, next) {
        var perPage = 10;
        var page = req.params.page || 1;
        try {
           const data = await Phone.find({})
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



/* GET All Device. */
router.get('/:page', async function(req, res, next) {
      var perPage = 10;
      var page = req.params.page || 1;

    try{
        const data = await Phone.find({})
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



/* Delete a Device. */
router.get('/delete/:id', async function(req, res, next) {
    var perPage = 10;
    var page = req.params.page || 1;

    try{
      await Phone.findByIdAndDelete(req.params.id);
      const data = await Phone.find({})
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

/* Edit get method a Device. */
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

// Filtering the serced result
/* GET All Device. */
router.post('/filter', async function(req, res, next){
    const key = req.body.key;
    const value = req.body.value;
    var perPage = 10;
    var page = req.params.page || 1;

  try{
    const data = await Phone.find({[key]: value})
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
