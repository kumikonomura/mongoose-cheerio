const { Comment, Article } = require('../models')

module.exports = app => {
  // GET all comments
  app.get('/comments', (req, res) => {
    Comment.find({})
      .populate('comment')
      .then(comments => res.json(comments))
      .catch(e => console.log(e))
  })
  // POST a comment
  app.post('/comments', (req, res) => {
    Comment.create(req.body, e => {
      if (e) throw e
      res.sendStatus(200)
    })
    // DELETE a comment from the db
    app.delete('/comments/:_id', (req, res) => {
      Comment.remove({ _id: req.params.id }, e => {
        if (e) throw e
        res.sendStatus(200)
      })
    })
  })
}
