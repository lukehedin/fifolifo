import React, { Component } from 'react';
import EditRow from './EditRow/EditRow'

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
        questions: []
    }
  }
  componentDidMount() {
    this.refreshQuestionData;
  }
  refreshQuestionData = fetch('/api/questions')
    .then(res => res.json())
    .then(res => {
        console.log(res);
        this.setState({
            questions: res
        });
    })
    .catch(err => console.log(err));
  render() {
    return (
        <div className="app-edit">
            {this.state.questions.map((question) => <EditRow key={question.id} question={question} />)}
            <button>Add New Question</button>
        </div>
    );
  }
}

export default Edit;