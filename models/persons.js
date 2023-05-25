const mongoose = require('mongoose')

const url = 'mongodb+srv://limbuprajil123:lkjhgfdsa@cluster1.pqkjfvj.mongodb.net/telephone-directory'

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

module.exports = Person