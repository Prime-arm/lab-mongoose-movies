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
  });

  router.get('/celebrities/edit/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Celebrity.findById(id)
      .then(celebrityFromDB => {
        // render an edit form with the data from the book
        console.log(celebrityFromDB);
        res.render('celebrities/celebrityEditForm', { celebrity: celebrityFromDB })
      })
      .catch(error => {
        console.log(error);
      })
  });

  router.get('/celebrities/delete/:id', (req, res) => {
    const id = req.params.id
    Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
    })
  })

  router.post('/celebrities/edit/:id', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    const id = req.params.id;
    Celebrity.findByIdAndUpdate(id, {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    })
    .then(celebrity => {
      res.redirect(`/celebrities/${celebrity._id}`)
    })
    .catch(error => {
      console.log(err);
    })
  })

module.exports = router;