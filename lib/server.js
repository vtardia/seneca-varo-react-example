'use strict'

var path = require('path')
var connect = require('connect')
var bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var PORT = process.env.PORT || 3000

// Using master branch of seneca-web plugin
var seneca = require('seneca')()
  .use('./api')
  .ready(function () {
    // Create some startup data
    this.make$('comments')
      .make$({author: 'John Doe', text: 'Hey there!'}).save$()
      .make$({author: 'James Heat', text: 'React is *great*!'}).save$()
  })

var app = connect()
  .use(serveStatic(path.join(__dirname, '../public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(seneca.export('web'))

app.listen(PORT, function () {
  console.log('Server started: http://localhost:' + PORT + '/')
})
