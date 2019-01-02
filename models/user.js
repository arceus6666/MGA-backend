const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const bcrypt = require('bcrypt-nodejs')
// const crypto = require('crypto')

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
    firstname: String,
    lastname: String
  },
  profilePic: {
    type: String,
    default: 'profile.png',
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    genres: [String],
    games: [String]
  },
  signupDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

/*
userSchema.pre('save', (next) => {
  var user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next()
      user.password = hash
      next()
    })
  })
})
*/

var User = mongoose.model('User', userSchema)

module.exports = User
