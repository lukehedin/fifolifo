import React, { Component } from 'react';
import CodeArea from '../../CodeArea/CodeArea';
import Checkbox from '../../Checkbox/Checkbox';
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
  //TODO LH: These could be turned into a single method or two
  onTextChange = e => this.updateQuestionProperty('questionText', e.target.value)
  onCodeChange = e => this.updateQuestionProperty('questionCode', e.target.value)
  onAnswerChange = e => this.updateQuestionProperty('answer', e.target.value)
  onDifficultyChange = e => this.updateQuestionProperty('difficulty', e.target.value)
  onCodeResponseChange = e => this.updateQuestionProperty('codeResponse', e.target.checked)
  onCopyCodeChange = e => this.updateQuestionProperty('copyCode', e.target.checked)
  onEnabledChange = e => this.updateQuestionProperty('enabled', e.target.checked)
  onTagChange = e => this.updateQuestionProperty('tags', e.target.value.split(','))
  render() {
    return (
        <div className={"edit-row " + (this.state.isEdited ? 'editing' : '')}>
            <div className="textareas">
                <textarea className="question-textarea" value={(this.state.question.questionText || '')} onChange={this.onTextChange.bind(this)} />
                <CodeArea className="question-textarea" value={(this.state.question.questionCode || '')} onChange={this.onCodeChange.bind(this)} />
                {/* Some of these aren't code questions but we make them all code areas for it to be easy */}
                <CodeArea className="question-textarea" value={(this.state.question.answer || '')} onChange={this.onAnswerChange.bind(this)} />
            </div>
            <div className="controls">
                <b>
                Question Id: {this.state.question.id}
                </b>
                <div>
                    Tags
                </div>
                <textarea className="question-tags" value={this.state.question.tags} onChange={this.onTagChange.bind(this)}/>
                <div>
                    Difficulty
                </div>
                <input type="number" value={this.state.question.difficulty} onChange={this.onDifficultyChange.bind(this)} />
                <Checkbox label="Requires code response" checked={this.state.question.codeResponse} onChange={this.onCodeResponseChange.bind(this)} />
                <Checkbox label="Copy code to response" checked={this.state.question.copyCode} onChange={this.onCopyCodeChange.bind(this)} />
                <Checkbox label="Enabled" checked={this.state.question.enabled} onChange={this.onEnabledChange.bind(this)} />
                <button onClick={this.saveQuestion.bind(this)}>Save</button>
                <button onClick={this.undoChanges.bind(this)}>Undo</button>
                <button>Delete</button>
            </div>
        </div>
    );
  }
}

export default EditRow;