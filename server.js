const express = require('express')
const axios = require('axios')
const { join } = require('path')
const db = require('mongojs')('nytimes_db')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

app.get('/scrape', (req, res) => {
  axios.get('https://www.nytimes.com')
    .then(({ data }) => {
      const $ = require('cheerio').load(data)
      $('.css-6p6lnl').each((i, elem) => db.articles.insert({
        title: $(elem).children('a').text(),
        link: `https://www.nytimes.com${$(elem).children('a').attr('href')}`
      }, (e, data) => console.log('data created: ', data)))
      return res.sendStatus(201)
    })
    .catch(e => console.log(e))
})

require('mongoose').connect('mongodb://localhost/nytimes_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(_ => app.listen(3000))
  .catch(e => console.log(e))

// app.listen(3000)
