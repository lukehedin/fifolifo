import React, { Component } from 'react';

class FifoItem extends Component {
  render() {
    return (
        <div className="fifo-item">
            {this.props.questions.length}
        </div>
    );
  }
}

export default FifoItem;