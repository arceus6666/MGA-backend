const express = require('express')
const gameCtrl = require('../controllers/game')
const api = express.Router()

api.post('/register', gameCtrl.register)
api.get('/find/:id', gameCtrl.getById)
api.get('/find-all', gameCtrl.getAll)
api.get('/find-name', gameCtrl.getByName)
api.get('/find-genres', gameCtrl.getByGenres)
api.get('/find-platforms', gameCtrl.getByPlatforms)
api.get('/find-companies', gameCtrl.getByCompanies)
api.get('/find-date', gameCtrl.getByDate)
api.put('/update', gameCtrl.updateRating)

module.exports = api
