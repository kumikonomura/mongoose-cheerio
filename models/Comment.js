module.exports = (Schema, model) => {
  const Comment = new Schema({
    title: {
      type: String
    },
    body: {
      type: String
    }
  })
  return model('Comment', Comment)
}
