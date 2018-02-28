import React, { Component } from 'react';
import './LifoItem.css'

class LifoItem extends Component {
  render() {
    return (
        <div className="lifo-item">
            <div className="lifo-tag">
                {this.props.question.tags.toString()}
            </div>
        </div>
    );
  }
}

export default LifoItem;