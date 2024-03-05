const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack_web:${password}@cluster0.grkp9mc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
try {
  mongoose.set('strictQuery', false)
  mongoose.connect(url)
} catch (error) {
  console.error(error)
}
  

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length>3) {
  // Add a new person to Person
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: `${name}`,
    number: `${number}`,
  })

  person.save().then(result => {
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  // Get all objects in Person
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
