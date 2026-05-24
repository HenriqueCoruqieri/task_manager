const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/mongoose.database')

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

const startServer = async () => {
  await connectToDatabase()
  app.listen(8000, () => console.log('Listening on port 8000!'))
}

startServer()
