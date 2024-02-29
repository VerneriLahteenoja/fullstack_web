let persons = require('./persons.json')
const express = require('express')
const app = express()

app.use(express.json())

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
    const person = req.body
    person.id = Math.floor(Math.random() * (200-persons.length)+persons.length)
    console.log(person)
    res.json(person)
})


// RUN
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
