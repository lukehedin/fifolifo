import React, { Component } from 'react';
import './CodeArea.css';

class CodeArea extends Component {
  onKeyDown(e){
    let keyCode = e.keyCode || e.which;

    //TAB handling
    if (keyCode === 9) {
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

    //We prevented the default above so we now have to call onChange manually
    if(this.props.onChange) this.props.onChange(e);
    if(this.props.onKeyDown) this.props.onKeyDown(e);
  }
  focus(){
    this.refs.textarea.focus();
  }
  render() {
    return (
        <textarea ref="textarea" className={"codearea " + (this.props.className || '')} 
          readOnly={this.props.readOnly}
          value={this.props.value} 
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.props.onChange 
            ? this.props.onChange.bind(this) 
            : null}/>
    );
  }
}

export default CodeArea;