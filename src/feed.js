// jwt parser and creation
const { verifyJwt } = require('./jwt')

// node's querystyring lib
const querystring = require('querystring')

// follower model
const Article = require('./models/Article')

// errors
const {
  UnauthorizedError
} = require('./error')

const getFeed = async (req, res) => {
  const jwt = await verifyJwt(req)

  if (!jwt) {
    throw new UnauthorizedError()
  }

  const feedQuery = Article
    .query()
    .joinRelation('author.follower')
    .where('author:follower.id', jwt.id)

  const qs = req.url.split('?').pop()
  const queryParsed = await querystring.parse(qs)
  const limit = queryParsed.limit || 20
  const offset = queryParsed.offset || 0

  const [articles, total] = await Promise.all([
    feedQuery
      .limit(limit)
      .offset(offset)
      .orderBy('createdAt', 'desc'),
    feedQuery
      .resultSize()
  ])

  return { articles, total }
}

module.exports = {
  getFeed
}