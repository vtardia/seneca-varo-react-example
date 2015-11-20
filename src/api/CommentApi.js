import $ from 'jquery'
import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentConstants from '../constants/CommentConstants'
import CommentActions from '../actions/CommentActions'
import Config from '../config'

class CommentApi {

  /**
   * Get list of comments from API endpoint
   */
  list () {
    var url = Config.apiUrl
    console.log('(CommentApi) Sending AJAX call...')
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        console.log('(CommentApi) Success: Sending CommentActions.list with payload', data)
        CommentActions.list(data)
      },
      error: function (xhr, status, err) {
        console.error(url, status, err.toString())
      }
    })
  }

  /**
   * Post a new comment to API endpoint
   * @param {object} comment New comment data
   */
  create (comment) {
    var url = Config.apiUrl
    console.log('(CommentApi) Creating remote comment', comment)
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (data) {
        // API returns the single inserted comment
        console.log('(CommentApi) Success: Sending CommentActions.list with no payload', data)
        CommentActions.list()
      },
      error: function (xhr, status, err) {
        console.error(url, status, err.toString())
      }
    })
  }
}

// Create new instance of this component
var Api = new CommentApi();

// Register action listener within the dispatcher
AppDispatcher.register(function(action) {
  var comment;

  switch(action.actionType) {
    // Create a new comment using REST API
    case CommentConstants.COMMENT_CREATE:
      console.log('(CommentApi) Received action CommentApiActions.create');
      comment = action.comment;
      Api.create(comment);
      break;

    case CommentConstants.COMMENT_LIST:
    // If there is no data fetch comment data from API, else do nothing
      console.log('(CommentApi) Received action CommentApiActions.list');
      if (!action.data) {
        console.log('(CommentApi) There is no data payload, will call AJAX list...');
        Api.list();
      } else {
        console.log('(CommentApi) There is a payload, so doing nothing');
      }
      break;

    default:
      // no op
  }
});


export default Api;
