import React, { Component } from 'react';
import EditRow from './EditRow/EditRow'
import './Edit.css'

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
        questions: []
    }
  }
  componentDidMount() {
    fetch('/api/questions')
    .then(res => res.json())
    .then(res => {
        console.log(res);

        this.setState({
            questions: res
        });
    })
    .catch(err => console.log(err));
  }
  addNewQuestion(){
    this.state.questions.push({
        id: null,
        questionText: "",
        questionCode: null,
        difficulty: 1,
        codeResponse: false,
        copyCode: false,
        tags: [],
        enabled: true,
        answer: ""
      });

      this.setState({
          questions: this.state.questions
      });
  }
  render() {
    return (
        <div className="app-edit">
            {this.state.questions.map((question) => <EditRow key={question.id} question={question} />)}
            <button onClick={this.addNewQuestion.bind(this)}>Add New Question</button>
        </div>
    );
  }
}

export default Edit;