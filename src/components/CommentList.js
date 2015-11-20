import React from 'react'

import Comment from './Comment'

class CommentList extends React.Component {
    render () {
      // Get comments dynamically
      var commentNodes = this.props.data.map(function (comment, index) { // eslint-disable-line
        return (
          <Comment key={'comment-' + index} author={comment.author}>
            {comment.text}
          </Comment>
        )
      })
      return (
          <div className='commentList'>
              {commentNodes}
          </div>
      )
    }
}

export default CommentList
