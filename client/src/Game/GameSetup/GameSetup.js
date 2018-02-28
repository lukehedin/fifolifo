import React, { Component } from 'react';
import './GameSetup.css'

class GameSetup extends Component {
    constructor(props) {
      super(props);

      this.state = {
          fifoAmount: 2, //amount to 'punish' for incorrect answer
          fifoMins: 0, //timer to add another question to the fifo queue
          lifoStartAmount: 5, // initial amount of questions
          lifoMins: 2, //timer to add another question to the lifo stack

          tags: [],

          questions: []
      };
    }
    onStartClick(){
      this.refs.startButton.classList.add('hidden');

      fetch('/api/questions')
      .then(res => res.json())
      .then(res => {
          console.log(res);

          //TODO filter by tag or code only etc
          let questions = res;

          let settings = {
            fifoAmount:  this.refs.fifoAmount.value,
            fifoMins:  this.refs.fifoMins.value,
            lifoStartAmount: this.refs.lifoStartAmount.value,
            lifoMins: this.refs.lifoMins.value,
            questions: questions
          };
    
          this.props.startGameFn(settings);
      })
      .catch(err => console.log(err));
    }
    render() {
      return (
      <div className="setup-game">
          <b className="fifo-red">Fifo Amount</b>
          <span>Amount of punishment questions for an incorrect answer (plus the answer itself)</span>
          <input type="number" ref="fifoAmount" defaultValue={this.state.fifoAmount} />
          <b className="fifo-red">Fifo Minutes</b>
          <span>How many minutes before another question is added to the fifo queue (0 for never)</span>
          <input type="number" ref="fifoMins" defaultValue={this.state.fifoMins} />

          <b className="lifo-blue">Lifo Amount</b>
          <span>The amount of inital questions on the stack</span>
          <input type="number" ref="lifoStartAmount" defaultValue={this.state.lifoStartAmount} />
          
          <b className="lifo-blue">Lifo Minutes</b>
          <span>How many minutes before another question is added to the lifo stack (0 for never)</span>
          <input type="number" ref="lifoMins" defaultValue={this.state.lifoMins} />
          
          <button ref="startButton" onClick={this.onStartClick.bind(this)}>Start</button>
      </div>)
  }
};

export default GameSetup;