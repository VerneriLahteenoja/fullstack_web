let persons = require('./persons.json')
const Person = require('./models/person')
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
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        const date = Date()
        res.send
        (`<div>Phonebook has info for ${people.length} people</div>
            </br>
            <div>${date}</div>
        `)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(422).json({ error: 'name or number missing' })  
    }
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(409).json({ error: 'Person with this name already exists'})
    }
    const person = {
        id: Math.floor(Math.random() * (200-persons.length)+persons.length),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.status(201).json(person)
})


// RUN
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
