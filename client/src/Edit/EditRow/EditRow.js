import React, { Component } from 'react';
import CodeArea from '../../CodeArea/CodeArea';
import './EditRow.css'

class EditRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        question: props.question,
        originalQuestion: {...props.question},
        isEdited: !props.question.id
    }
  }
  componentDidMount() {

  }
  saveQuestionData = (qData) => {
    return fetch('/api/savequestion', {
      body: JSON.stringify(qData), // must match 'Content-Type'
      method: "POST",
      headers: {
          'content-type': 'application/json'
          }
      });
  }
  undoChanges = e => {
    let originalQuestion = {...this.state.originalQuestion};
    this.setState({ 
        question: originalQuestion,
        isEdited: false
    });
  }
  saveQuestion(){
    this.saveQuestionData(this.state.question)
    .then(res => {
        console.log(res);
        this.setState({
            isEdited: false
        });
    });
  }
  updateQuestionProperty(prop, value){
    let questionCopy = this.state.question;
    questionCopy[prop] = value;    
    this.setState({ question: questionCopy });
    
    this.setState({ isEdited: true });
  }
  //LH SHOULD BE QUESTOIN.QUESTIONTEXT
  onTextChange = e => this.updateQuestionProperty('questionText', e.target.value)
  onCodeChange = e => this.updateQuestionProperty('questionCode', e.target.value)
  onAnswerChange = e => this.updateQuestionProperty('answer', e.target.value)
  render() {
    return (
        <div className={"edit-row " + (this.state.isEdited ? 'editing' : '')}>
            <div className="textareas">
                <textarea className="question-text" value={(this.state.question.questionText || '')} onChange={this.onTextChange.bind(this)} />
                <CodeArea className="question-code" value={(this.state.question.questionCode || '')} onChange={this.onCodeChange.bind(this)} />
                {/* Some of these aren't code questions but we make them all code areas for it to be easy */}
                <CodeArea className="question-answer" value={(this.state.question.answer || '')} onChange={this.onAnswerChange.bind(this)} />
            </div>
            <div className="controls">
                <input type="number" defaultValue={this.state.question.difficulty} />Difficulty
                <input type="checkbox" defaultChecked={this.state.question.codeResponse} />Requires code response
                <input type="checkbox" defaultChecked={this.state.question.copyCode} />Copy code to response
                <input type="checkbox" defaultChecked={this.state.question.enabled} /> Enabled
                <button onClick={this.saveQuestion.bind(this)}>Save</button>
                <button onClick={this.undoChanges.bind(this)}>Undo</button>
                <button>Delete</button>
            </div>
        </div>
    );
  }
}

export default EditRow;