const mongoose = require('mongoose')
const Schema = mongoose.Schema

var gameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: 'Unknown',
    required: true
  },
  genres: {
    type: [String],
    default: ['Unknown'],
    required: true
  },
  platforms: {
    type: [String],
    default: ['Unknown'],
    required: true
  },
  released: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  }
})

var Game = mongoose.model('Game', gameSchema)

module.exports = Game
