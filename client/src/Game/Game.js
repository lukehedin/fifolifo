import React, { Component } from 'react';
import './Game.css'
import GameSetup from './GameSetup/GameSetup';
import GamePlay from './Gameplay/Gameplay';

class Game extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        gameSettings: {},
        timeBegun: null,
        timeCompleted: null
      };
    }
    startGame(gameSettings){
        this.setState({
            gameSettings: gameSettings,
            timeBegun: new Date() 
        });
    }
    render() {

        if(this.startGame.timeCompleted) {
            return(<div>you did it</div>)
        } else if(this.state.timeBegun) {
            return(<GamePlay gameSettings={this.state.gameSettings} />)
        } else{
            return(<GameSetup startGameFn={this.startGame.bind(this)} />)
        }
  }
};

export default Game;