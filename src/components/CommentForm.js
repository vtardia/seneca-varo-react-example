import React from 'react'

import autobind from 'autobind-decorator'

@autobind
class CommentForm extends React.Component {
    handleSubmit (e) {
      e.preventDefault()
      var author = this.refs.author.value.trim()
      var text = this.refs.text.value.trim()
      if (!text || !author) {
        return
      }
      this.props.onCommentSubmit({author: author, text: text}) // eslint-disable-line
      this.refs.author.value = ''
      this.refs.text.value = ''
      return
    }
    render () {
      return (
        <form className='commentForm' onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Your name' ref='author' />
          <input type='text' placeholder='Say something...' ref='text' />
          <input type='submit' value='Post' />
        </form>
      )
    }
}

export default CommentForm
