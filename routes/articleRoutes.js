const { Article } = require('../models')

module.exports = app => {
  // GET all articles
  app.get('/articles', (req, res) => {
    Article.find({}, (e, articles) => {
      if (e) throw e
      res.json(articles)
    })
  })
}
