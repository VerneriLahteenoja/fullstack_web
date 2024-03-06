let persons = require('./persons.json')
const Phonebook = require('./models/person')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {return req.method==='POST' ? JSON.stringify(req.body) : ''})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  })
)

app.get('/api/persons', (req, res) => {
    Phonebook.People.find({}).then(people => {
        res.json(people)
    })
})

app.get('/info', (req, res) => {
    Phonebook.People.find({}).then(people => {
        const date = Date()
        res.send
        (`<div>Phonebook has info for ${people.length} people</div>
            </br>
            <div>${date}</div>
        `)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Phonebook.People.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Phonebook.People.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Phonebook.People.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(422).json({ error: 'name or number missing' })  
    }
    Phonebook.addNewPerson({name: body.name, number: body.number})
    res.status(201)
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)

// RUN
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
