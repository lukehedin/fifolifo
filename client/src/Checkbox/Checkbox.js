import React, { Component } from 'react';
import './Checkbox.css';

class Checkbox extends Component {
  render() {
    return (
    <div className={"cb " + this.props.className}>
        <input className="cb-box" type="checkbox" checked={this.props.checked} onChange={this.props.onChange.bind(this)} />
        <div className="cb-label">
            {this.props.label}
        </div>
    </div>
    );
  }
}

export default Checkbox;