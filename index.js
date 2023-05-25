const express = require('express')
const app = express()
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Person = require('./models/persons')

let persons = [
      {
        name: "Arto Hellas",
        number: "041-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "042-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "043-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "044-123456",
        id: 4
      },
      {
        name: "Prajil Limbu",
        number: "045-123456",
        id: 5
      }
]

const formatPerson = (person) => {
  return {
    id: person._id,
    name: person.name,
    number: person.number
  }
}

app.get('/', (req, res) => {
  res.send('build', 'index.html')
})  

app.get('/api', (req, res) => {
  res.send('<h1>Hello Sir, Please mind the URI.</h1>')
})  

app.get('/api/persons', (req, res) => {
    Person
      .find({}, {__v: 0})
      .then(persons => {
        res.json(persons.map(formatPerson))
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted url' })
      })
})  

app.get('/api/persons/:id', (req, res) => {
    Person
      .findById(req.params.id)
      .then(person => {
        if (person) {
          res.json(formatNote(person))
        } else {
          res.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'cant get malformatted id' })
      })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
      .findByIdAndRemove(req.params.id)
      .then(result => {
        if (result) {
          res.json(result)
        } else {
          res.status(204).end()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'cant remove malformatted id' })
      })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined) {
      return res.status(400).json({error: 'name or number must be unique'})
    }
    const person = new Person({
      name: body.name, 
      number: body.number
    })
  
    person
      .save()
      .then(formatPerson)
      .then(savedAndFormattedPerson => {
        res.json(savedAndFormattedPerson)
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send({ error: 'malformatted post' })
      })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true } )
    .then(updatedPerson => {
      res.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'cant update malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})