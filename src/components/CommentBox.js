import React from 'react'

import CommentList from './CommentList'
import CommentForm from './CommentForm'
import CommentStore from '../stores/CommentStore'
import CommentActions from '../actions/CommentActions'

import autobind from 'autobind-decorator'

function getCommentState () {
  return {data: CommentStore.getAll()}
}

@autobind
class CommentBox extends React.Component {

  constructor (props) {
    super(props)

    // set initial state
    this.state = {data: []}
    console.log('(CommentBox) Invoking CommentActions.list')
    CommentActions.list()
  }

    // Automatically run when the component is rendered
    componentDidMount () {
      CommentStore.addChangeListener(this._onChange)
    }

    componentWillUnmount () {
      CommentStore.removeChangeListener(this._onChange)
    }

    /**
     * Event handler for 'change' events coming from the CommentStore
     */
    _onChange () {
      this.setState(getCommentState())
    }

    _onCommentSubmit (comment) {
      console.log('(CommentBox) Invoking CommentActions.create')
      CommentActions.create(comment)
    }

    render () {
      return (
        <div className='commentBox'>
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this._onCommentSubmit} />
        </div>
      )
    }
}

export default CommentBox
