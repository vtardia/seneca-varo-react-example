import React from 'react'

import marked from 'marked'

class Comment extends React.Component {

    // Bypass React XSS filter
    // Implicitely trust marked() library to be secure and use sanitize
    rawMarkup () {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true}) // eslint-disable-line
      return { __html: rawMarkup }
    }

    render () {
      return (
        <div className='comment'>
          <h2 className='commentAuthor'>
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} /> {/* Bypass React XSS filter (see above) */}
        </div>
      )
    }
}

export default Comment
