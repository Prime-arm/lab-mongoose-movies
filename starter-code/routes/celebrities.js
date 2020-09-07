const express = require('express');
const router  = express.Router();
const Celebrities = require('../models/Celebrity');
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    
  Celebrity.find().then(celebritiesFromDB => {
    console.log('This is celebrities',celebritiesFromDB);
    res.render('celebrities/index', { celebritiesList: celebritiesFromDB})
  })
  .catch(error => {
      console.log(error);
  })
});

router.get('/celebrities/add', (req, res) => {
    res.render('celebrities/celebForm')
  });

router.get('/celebrities/:id', (req, res) => {
    const id = req.params.id
    Celebrity.findById(id).then(celebrityFromDB => {
      res.render('celebrities/celebrityDetails', { celebrity: celebrityFromDB });
    })
    .catch(error => {
        console.log(error);
    })
  });

  router.post('/celebrities', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    }).then(celebrity => {
      console.log(`new Celeb is here: ${celebrity}`);
      res.redirect(`/celebrities/${celebrity._id}`)
    }). catch(error => {
      console.log(error);
    })
  })

module.exports = router;