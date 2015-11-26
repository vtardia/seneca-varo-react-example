'use strict'

module.exports = function api (options) {
  var seneca = this

  seneca.add('role:api,info:hello', hello)

  seneca.add('init:api', function (args, done) {
    // Order is significant here!

    seneca.act('role:web', {use: {
      prefix: '/api',
      pin: 'role:api,info:*',
      map: {
        hello: true
      }
    }})

    seneca.use('jsonrest-api', {prefix: '/api'})

    done()
  })

  function hello (args, done) {
    done(null, {msg: 'Hello! This API is working!'})
  }
}
