const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`Connecting to url: ${url}`)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log(`error connecting to MongoDB: ${error.message}`)
  })

const validator = (val) => {
  return /\d{2,3}-\d{7,8}/.test(val)
}

// Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator,
      message: 'Make sure the number is in format: 12-12345678 or 123-1234567'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const People = mongoose.model('Person', personSchema)

// const addNewPerson = (doc) => {
//   const newPerson = new People(doc)
//   newPerson.save().then(result => console.log(`added ${result}`))
// }

//   const person = new Person({
//     name: `${name}`,
//     number: `${number}`,
//   })

//   person.save().then(result => {
//     console.log(`added ${name} ${number} to phonebook`)
//     mongoose.connection.close()
//   })

// } else {
//   // Get all objects in Person
//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })
// }

module.exports = { People }



