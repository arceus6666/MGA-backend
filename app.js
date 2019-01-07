const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userApi = require('./routes/user')
const gameApi = require('./routes/game')
const auth = require('./middlewares/auth')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', userApi)
app.use('/games', gameApi)

app.get('/', (req, res) => {
  res.status(200).send('Todo correcto')
})

app.get('/auth', auth)

module.exports = app
