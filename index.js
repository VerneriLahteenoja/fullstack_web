const numbers = require('./numbers.json')
const express = require('express')
const app = express()

const PORT = 3001

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/numbers', (req, res) => {
    res.json(numbers)
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
