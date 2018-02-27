import React, { Component } from 'react';
import './CodeArea.css';

class CodeArea extends Component {
  constructor(props) {
    super(props);

  }
  onKeyDown(e){
    let keyCode = e.keyCode || e.which;

    //TAB handling
    if (keyCode == 9) {
        e.preventDefault();

        let textArea = e.target;

        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        textArea.value = textArea.value.substring(0, start) 
            + "\t" 
            + textArea.value.substring(end);

        // put caret at right position again
        textArea.selectionStart = textArea.selectionEnd = start + 1;
    }
  }
  render() {
    return (
        <textarea className="codearea" onKeyDown={this.onKeyDown} value={this.props.value} onChange={this.props.onChange.bind(this)}/>
    );
  }
}

export default CodeArea;