const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()

api.post('/register', userCtrl.signUp)
api.get('/find-all', userCtrl.getAll)
api.get('/find/:id', userCtrl.getById)
api.get('/login', userCtrl.login)
api.put('/password', userCtrl.updatePassword)
api.put('/favorites',userCtrl.updateFavorites)
api.put('/update-admin', userCtrl.updateAdmin)

module.exports = api
