const User = require('../models/user')
const Token = require('../services/token')

const signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    favorites: {
      genres: [],
      games: []
    }
  })

  if (req.body.favorites) {
    user.favorites = req.body.favorites
  }

  user.save().then((us) => {
    res.status(200).send({ msg: us, ok: true })
  }, (err) => {
    res.status(500).send({ msg: err, ok: false })
  })
}

const login = (req, res) => {
  if (!req.query.param) return res.status(500).send({ msg: 'Error', ok: false })
  let param = req.query.param.split('-')
  User.findOne({ username: param[0] }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(404).send({ msg: 'User not found', ok: false })
    if (user.password === param[1]) {
      user.lastLogin = Date.now()
      user.save().then((userInfo) => {
        res.status(200).send({ msg: user, token: Token.createToken(user), ok: true })
      }, (err) => {
        res.status(500).send({ msg: err, ok: false })
      })
    } else {
      res.status(403).send({ msg: 'Wrong password', ok: false })
    }
  })
}

const getById = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'User not found', ok: false })
    res.status(200).send({ msg: user, ok: true })
  })
}

const updatePassword = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'User not found', ok: false })
    user.password = req.body.password
    user.save().then((us) => {
      res.status(200).send({ msg: us, ok: true })
    }, (err) => {
      res.status(500).send({ msg: err, ok: false })
    })
  })
}

const updateFavorites = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'User not found', ok: false })
    user.favorites = req.body.favorites
    user.save().then((us) => {
      res.status(200).send({ msg: us, ok: true })
    }, (err) => {
      res.status(500).send({ msg: err, ok: false })
    })
  })
}

const updateProfilePic = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'User not found', ok: false })
    user.profilePic = req.picture
    user.save().then((userInfo) => {
      res.status(200).send({ msg: 'Saved', ok: true })
    }, (err) => {
      res.status(500).send({ msg: err, ok: false })
    })
  })
}

const getAll = (req, res) => {
  User.find({}, (err, users) => {
    console.log(users)
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(users)
    }
  })
}

module.exports = {
  signUp,
  getById,
  login,
  updatePassword,
  updateFavorites,
  updateProfilePic,
  getAll
}
