import React, { Component } from 'react';
import './GameSetup.css'

class GameSetup extends Component {
    constructor(props) {
      super(props);

      this.state = {
          fifoAmount: 2, //amount to 'punish' for incorrect answer
          fifoMins: 0, //timer to add another question to the fifo queue
          lifoStartAmount: 5, // initial amount of questions
          lifoMins: 0, //timer to add another question to the lifo stack
          tagInclude: [], 

          tags: []
      };
    }
    onStartClick(){
      let settings = {
        fifoAmount:  this.refs.fifoAmount.value,
        fifoMins:  this.refs.fifoMins.value,
        lifoStartAmount: this.refs.lifoStartAmount.value,
        lifoMins: this.refs.lifoMins.value,
        tagInclude: this.refs.tagInclude.value
          ? this.refs.tagInclude.value.split(',') 
          : []
      };

      this.props.startGameFn(settings);
    }
    render() {
      return (
      <div className="setup-game">
          <div className="setup-setting">
            <b className="fifo-red">Fifo Amount</b>
            <div>Amount of punishment questions for an incorrect answer (plus the answer itself)</div>
            <input type="number" ref="fifoAmount" defaultValue={this.state.fifoAmount} />
          </div>
          <div className="setup-setting">
            <b className="fifo-red">Fifo Minutes</b>
            <div>How many minutes before another question is added to the fifo queue (0 for never)</div>
            <input type="number" ref="fifoMins" defaultValue={this.state.fifoMins} />
          </div>
          <div className="setup-setting">
            <b className="lifo-blue">Lifo Amount</b>
            <div>The amount of inital questions on the stack</div>
            <input type="number" ref="lifoStartAmount" defaultValue={this.state.lifoStartAmount} />
          </div>
          <div className="setup-setting">
            <b className="lifo-blue">Lifo Minutes</b>
            <div>How many minutes before another question is added to the lifo stack (0 for never)</div>
            <input type="number" ref="lifoMins" defaultValue={this.state.lifoMins} />  
          </div>
          <div className="setup-setting">
            <b>Tags</b>
            <div>Only include questions with these tags (leave blank for none)</div>
            <input type="text" ref="tagInclude" defaultValue="" />
          </div>
          <button ref="startButton" onClick={this.onStartClick.bind(this)}>Start</button>
      </div>)
  }
};

export default GameSetup;