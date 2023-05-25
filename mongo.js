const mongoose = require('mongoose')

const url = 'mongodb+srv://limbuprajil123:asdfghjkl@cluster1.mj0tppb.mongodb.net/telephone-directory'

mongoose.connect(url)
            .then(()=>{
              console.log('Connection with mongoose successful')
            })
            .catch( err=>{
            console.log('Error is', err.message)
            })

const Person = mongoose.model('Phonebook', {
  name: String,
  number: String
})

if (process.argv.length === 4) {
  const name = process.argv[2];
  const number = process.argv[3];
  
  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then(() => {
      console.log(`Adding person ${name} number ${number} to the directory.`)
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
} else {
  Person
    .find({})
    .then(result => {
      result.forEach(note => console.log(note))
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

