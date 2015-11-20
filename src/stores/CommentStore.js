import events from 'events'

import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentConstants from '../constants/CommentConstants'
import CommentActions from '../actions/CommentActions'

// We need this here or the library is not imported
import CommentApi from '../api/CommentApi' // eslint-disable-line

import Config from '../config'

var CHANGE_EVENT = 'change'

// Local copy of data
var _comments = {}

class CommentStore extends events.EventEmitter {

  constructor () {
    super()
    setInterval(function () {
      console.log('(CommentStore) Refreshing...')
      CommentActions.list()
    }, Config.pollInterval)
  }

  emitChange () {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getAll () {
    var data = []
    Object.keys(_comments).forEach(function (id) {
      data.push(_comments[id])
    })
    return data
  }

}

var Store = new CommentStore()

// Register callback to handle all updates
AppDispatcher.register(function (action) {
  var comment

  switch (action.actionType) {
    case CommentConstants.COMMENT_CREATE:
    // Optimistically update the view with new comment data while the AJAX call is running
      comment = action.comment
      console.log('(CommentStore) Received action CommentActions.create', comment)

      console.log('(CommentStore) Updating comment view with new comment')
      _comments[comment.id] = comment
      Store.emitChange()
      break

    case CommentConstants.COMMENT_LIST:
      // Update the local copy of data and the view if a payload is present, else do nothing
      console.log('(CommentStore) Received action CommentActions.list')
      if (action.data) {
        console.log('(CommentStore) Payload present, refresh UI with', action.data)

        // Update local data
        action.data.forEach(function (comment) {
          _comments[comment.id] = comment
        })
        Store.emitChange()
      } else {
        console.log('(CommentStore) No Payload, doing nothing')
      }
      break

    default:
      // no op
  }
})

export default Store
