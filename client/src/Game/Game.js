import React, { Component } from 'react';
import './Game.css'
import GameSetup from './GameSetup/GameSetup';
import GamePlay from './Gameplay/Gameplay';

class Game extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        questions: [],
        gameResults: {},
        gameSettings: {},
        timeBegun: null,
        timeComplete: null
      };
    }
    componentDidMount(){

    }
    startGame(gameSettings){
        fetch('/api/questions')
        .then(res => res.json())
        .then(res => {
            console.log(res);
  
            this.setState({
                questions: res,
                gameSettings: gameSettings,
                timeBegun: new Date()
            });
        })
        .catch(err => console.log(err));
    }
    completeGame = results => {
        this.setState({
            questions: [], //unload question data
            timeComplete: new Date(),
            gameResults: results
        });
    }
    savePlaythrough(){
        fetch('/api/saveplaythrough', {
            body: JSON.stringify({
                gameResults: this.state.gameResults,
                gameSettings: this.state.gameSettings,
                timeBegun: this.state.timeBegun,
                timeComplete: this.state.timeComplete
            }),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            this.setState({
                gameResults: {},
                gameSettings: {},
                timeBegun: null,
                timeComplete: null
              });
        });
    }
    render() {
        if(this.state.timeComplete) {
            return(<div>
                Game complete!
                <button onClick={this.savePlaythrough.bind(this)}>Save Playthrough and Reset</button>
            </div>)
        } else if(this.state.timeBegun) {
            return(<GamePlay questions={this.state.questions} gameSettings={this.state.gameSettings} onComplete={this.completeGame.bind(this)} />)
        } else {
            return(<GameSetup startGameFn={this.startGame.bind(this)} />)
        }
  }
};

export default Game;