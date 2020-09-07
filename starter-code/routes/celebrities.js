const express = require('express');
const router  = express.Router();
// const Celebrities = require('../models/Celebrity');
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
    
  Celebrity.find().then(celebritiesFromDB => {
    console.log('This is celebrities',celebritiesFromDB);
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB})
  })
  .catch(error => {
      console.log(err);
  })
});

module.exports = router;