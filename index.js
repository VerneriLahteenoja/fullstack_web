let persons = require('./persons.json')
const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

const PORT = 3001


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = Date()
    res.send
    (`<div>Phonebook has info for ${persons.length} people</div>
        </br>
        <div>${date}</div>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
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
    console.log(persons)
    res.status(201).json(person)
})


// RUN
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
