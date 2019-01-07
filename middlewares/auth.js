const tokenService = require('../services/token')

const isAuth = (req, res, next) => {
  // console.log(req.headers)
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: 'No authorization', ok: false })
  }

  const token = req.headers.authorization.split(' ')[0]

  tokenService.decodeToken(token)
    .then(response => {
      req.user = response
      res.status(200).send({ msg: response, ok: true })
      next()
    })
    .catch(response => {
      res.status(403).send({ msg: 'Token invalido.', ok: false })
    })
}

module.exports = isAuth
