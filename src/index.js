// external libs
const {
  router,
  get,
  post,
  put,
  del
} = require('microrouter')
const { send } = require('micro')
const { Model } = require('objection')

// handling errors
const { handleErrors } = require('./error')

// knex declaration and config
const Knex = require('knex')
const knexconfig = require('./config/knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexconfig)

// objection model init
Model.knex(knex)

// user actions
const {
  createUser,
  patchUser,
  getUser
} = require('./user')

// auth
const { login } = require('./auth')

// profiles action
const { getProfile } = require('./profile')

// follow actions
const {
  newFollow,
  delFollow
} = require('./follow')

// articles actions
const {
  createArticle,
  getArticles
} = require('./article')

// feed action
const {
  getFeed
} = require('./feed')

const notFound = async (req, res) => send(res, 404, 'Not Found')

module.exports = handleErrors(
  router(
    post('/users/login', login),

    post('/users', createUser),
    put('/users', patchUser),
    get('/users', getUser),

    get('/profiles/:username', getProfile),

    post('/profiles/:username/follow', newFollow),
    del('/profiles/:username/follow', delFollow),

    post('/articles', createArticle),
    get('/articles', getArticles),

    get('/articles/feed', getFeed),

    get('/*', notFound),
    post('/*', notFound),
    put('/*', notFound),
    del('/*', notFound)
  )
)
