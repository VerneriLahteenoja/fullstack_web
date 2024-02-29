const persons = require('./persons.json')
const express = require('express')
const app = express()

const PORT = 3001


app.get('/api/persons', (req, res) => {
    res.json(persons)
})
console.log(persons)
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


// RUN
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
