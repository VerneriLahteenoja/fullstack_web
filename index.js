const numbers = require('./numbers.json')
const express = require('express')
const app = express()

const PORT = 3001


app.get('/api/numbers', (req, res) => {
    res.json(numbers)
})
console.log(numbers)
app.get('/info', (req, res) => {
    const date = Date()
    res.send(
        `<div>Phonebook has info for ${numbers.length} people</div>
        </br>
        <div>${date}</div>
        `)
})


// RUN
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
