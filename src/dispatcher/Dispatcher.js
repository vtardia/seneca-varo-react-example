import Varo from 'varo'
import uuid from 'node-uuid'

var V = Varo()

/**
 * Invoke a callback
 */
function invoke (id) {
  this.isPending[id] = true
  this.callbacks[id](this.pendingPayload)
  this.isHandled[id] = true
}

/**
 * Set up dispatch action
 */
function start (payload) {
  for (var id in this.callbacks) {
    this.isPending[id] = false
    this.isHandled[id] = false
  }
  this.isDispatching = true
  this.pendingPayload = payload
}

/**
 * Close dispatch action
 */
function stop () {
  this.isDispatching = false
  this.pendingPayload = null
}

class Dispatcher {
  constructor () {
    this.isDispatching = false
    this.pendingPayload = null
    this.callbacks = {}
    this.observers = {}
    this.isPending = {}
    this.isHandled = {}
  }

  register (callback) {
    var id = uuid()

    // register an observer that run the specified callback
    var observer = function (msg) {
      // the callback is already running or is in waitFor status
      if (this.isPending[id]) return

      // set current payload
      this.pendingPayload = msg.payload
      invoke.call(this, id)
    }.bind(this)
    V.observe({role: 'dispatcher'}, observer)

    // keep trace of the callback
    this.callbacks[id] = callback
    this.observers[id] = observer

    console.log('Registered callback with id', id)
    return id
  }

  unregister (id) {
    delete this.callbacks[id]
    V.removeHandler(this.observers[id])
  }

  dispatch (payload) {
    if (this.isDispatching) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Dispatcher.dispatch(...): Cannot dispatch, already dispatching')
      }
      return
    }

    // start dispatching
    start.call(this, payload)

    // dispatch
    V.act({role: 'dispatcher', payload: payload})

    // stop dispatching
    stop.call(this)
  }

  waitFor (ids) {
    if (!this.isDispatching) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Dispatcher.waitFor(...): Must be invoked while dispatching.')
      }
    }
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii]
      if (this.isPending[id]) {
        if (!this.isHandled[id]) {
          if (process.env.NODE_ENV !== 'production') {
            throw new Error('Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `' + id + '`.')
          }
        }
        continue
      }
      if (!this.callbacks[id]) {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error('Dispatcher.waitFor(...): `' + id + '` does not map to a registered callback.')
        }
      }
      invoke.call(this, id)
    }
  }
}

export default Dispatcher
