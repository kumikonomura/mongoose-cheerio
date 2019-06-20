module.exports = (Schema, model) => {
  const Article = new Schema({
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  })
  return model('Article', Article)
}
