const User = require('../models/user')

function signUp(req, res) {
  const user = new User({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    favorites: {
      genres: [],
      platforms: [],
      companies: [],
      games: []
    },
    role: req.body.role
  })

  if (req.body.favorites) {
    user.favorites = req.body.favorites
  }

  user.save().then((us) => {
    res.send(us)
  }, (err) => {
    res.send(err)
  })
}

function login(req, res) {
  User.findOne({ username: req.query.username }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'Usuario no encontrado', ok: false })
    if (user.password === req.query.password) {
      user.lastLogin = Date.now()
      user.save().then((userInfo) => {
        res.status(200).send({ msg: 'Todo correcto', ok: true })
      }, (err) => {
        res.status(500).send({ msg: err, ok: false })
      })
    } else {
      res.status(403).send({ msg: 'Contraseña incorrecta', ok: false })
    }
  })
}

function getById(req, res) {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'Usuario no encontrado', ok: false })
    res.status(200).send({ msg: user, ok: true })
  })
}

function updatePassword(req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'Usuario no encontrado', ok: false })
    user.password = req.body.password
    user.save().then((us) => {
      res.status(200).send({ message: us, ok: true })
    }, (err) => {
      res.status(500).send({ message: err, ok: false })
    })
  })
}

function updateFavorites(req, res) {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!user) return res.status(500).send({ msg: 'Usuario no encontrado', ok: false })
    user.favorites = req.body.favorites
    user.save().then((us) => {
      res.status(200).send({ message: us, ok: true })
    }, (err) => {
      res.status(500).send({ message: err, ok: false })
    })
  })
}

function getAll(req, res) {
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
  getAll
}
