const Game = require('../models/game')

const register = (req, res) => {
  const game = new Game({
    name: req.body.name,
    img: req.body.img,
    description: req.body.description,
    company: req.body.company,
    released: req.body.released,
    rating: req.body.rating
  })

  if (req.body.genres) {
    game.genres = req.body.genres
  }

  if (req.body.platforms) {
    game.platforms = req.body.platforms
  }

  game.save().then((us) => {
    res.send({ msg: us, ok: true })
  }, (err) => {
    res.send({ msg: err, ok: false })
  })
}

const getById = (req, res) => {
  Game.findOne({ _id: req.params.id }, (err, game) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!game) return res.status(500).send({ msg: 'Game not found', ok: false })
    res.status(200).send({ msg: game, ok: true })
  })
}

const getByName = (req, res) => {
  console.log(req.query.param)
  Game.findOne({ name: req.query.param }, (err, game) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!game) return res.status(500).send({ msg: 'Game not found', ok: false })
    res.status(200).send({ msg: game, ok: true })
  })
}

const updateRating = (req, res) => {
  Game.findOne({ username: req.params.id }, (err, game) => {
    if (err) return res.status(500).send({ msg: err, ok: false })
    if (!game) return res.status(500).send({ msg: 'Game not found', ok: false })
    game.rating = req.body.rating
    game.save().then((gm) => {
      res.status(200).send({ msg: gm, ok: true })
    }, (err) => {
      res.status(500).send({ msg: err, ok: false })
    })
  })
}

const getAll = (req, res) => {
  Game.find({}, (err, games) => {
    console.log(games)
    if (err) {
      res.status(500).send({ msg: err, ok: false })
    } else {
      res.status(200).send({ msg: games, ok: true })
    }
  })
}

const getByGenres = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.status(500).send({ msg: err, ok: false })
    } else {
      let gs = []
      for (let game in games) {
        for (let genre in game.genres) {
          if (req.body.genre === genre) {
            gs.push(game)
            break
          }
        }
      }
      res.status(200).send({ msg: gs, ok: true })
    }
  })
}

const getByPlatforms = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.status(500).send({ msg: err, ok: false })
    } else {
      let ps = []
      for (let game in games) {
        for (let platform in game.platforms) {
          if (req.body.platform === platform) {
            ps.push(game)
            break
          }
        }
      }
      res.status(200).send({ msg: ps, ok: true })
    }
  })
}

const getByCompanies = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.status(500).send({ msg: err, ok: false })
    } else {
      let cs = []
      for (let game in games) {
        for (let company in game.companies) {
          if (req.body.company === company) {
            cs.push(game)
            break
          }
        }
      }
      res.status(200).send({ msg: cs, ok: true })
    }
  })
}

const getByDate = (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.status(500).send({ msg: err, ok: false })
    } else {
      let ds = []
      for (let game in games) {
        if (req.body.year === game.released.getFullYear()) {
          ds.push(game)
          break
        }
      }
      res.status(200).send({ msg: ds, ok: true })
    }
  })
}

module.exports = {
  register,
  getById,
  getByName,
  updateRating,
  getByGenres,
  getByPlatforms,
  getByCompanies,
  getByDate,
  getAll
}
