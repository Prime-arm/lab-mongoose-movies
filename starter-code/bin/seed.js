const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity')


mongoose.connect('mongodb://localhost/Celebrities', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Miley Cyrus",
    occupation: "Singer",
    catchPhrase: "I am Miley Cyrus"
  },
  {
    name: "Kim Kardashian",
    occupation: "unknown",
    catchPhrase: "I am Kim Kardashian"
  },
  {
    name: "Tom Hanks",
    occupation: "Actor",
    catchPhrase: "I am Tom Hanks"
  }
];

Celebrity.insertMany(celebrities)
.then(data => {
  console.log(`Success! Added ${data.length} celebrities to the database`);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
})