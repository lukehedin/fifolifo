import React, { Component } from 'react';
import CodeArea from '../../CodeArea/CodeArea';
import './EditRow.css'

class EditRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        question: props.question
    }
  }
  componentDidMount() {

  }
  render() {
    return (
        <div className="edit-row">
            <div className="textareas">
                <textarea className="question-text" defaultValue={this.state.question.questionText}/>
                <CodeArea className="question-code" value={this.state.question.questionCode} />
                {/* Some of these aren't code questions but we make them all code areas for it to be easy */}
                <CodeArea className="question-answer" value={this.state.question.answer} />
            </div>
            <div className="controls">
                <input type="number" />Difficulty
                <input type="checkbox" />Requires code response
                <input type="checkbox" />Copy code to response
                <input type="checkbox" />Enabled
                <button>Save</button>
            </div>
        </div>
    );
  }
}

export default EditRow;