'use strict'

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var web = require('seneca-web')

// Using master branch of seneca-web plugin
var seneca = require('seneca')({default_plugins: {web: false}})
  .use(web)
  .use('./api')
  .ready(function () {
    // Create some startup data
    this.make$('comments')
      .make$({author: 'John Doe', text: 'Hey there!'}).save$()
      .make$({author: 'James Heat', text: 'React is *great*!'}).save$()
  })

var app = express()
  .set('port', (process.env.PORT || 3000))
  .use('/', express.static(path.join(__dirname, '../public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  // Remove unused querystring that causes failure in parsing jsonrest-api
  .use(function (req, res, next) {
    req.query = {}
    next()
  })
  .use(seneca.export('web'))

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
