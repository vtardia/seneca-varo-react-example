import CommentConstants from '../constants/CommentConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

class CommentActions {
    /**
     * @param  {object} comment New comment data
     */
    create (comment) {
        // Dispatch action CommentCreate to dispatcher with comment payload
      comment.id = new Date().getTime()
      console.log('Dispatching CommentActions.create to dispatcher with comment payload', comment)
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_CREATE,
        comment: comment
      })
    }

    /**
     * @param  {array} data List of comments
     */
    list (data) {
      console.log('(CommentActions) Dispatching action COMMENT_LIST to Dispatcher')
      AppDispatcher.dispatch({
        actionType: CommentConstants.COMMENT_LIST,
        data: data || null
      })
    }
}

export default new CommentActions()
