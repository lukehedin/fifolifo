import React, { Component } from 'react';
import './FifoItem.css'

class FifoItem extends Component {
  render() {
    return (
    <div className="fifo-item">
        <div className="fifo-tag">
            {this.props.questions.length}x
        </div>
    </div>
    );
  }
}

export default FifoItem;