import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);

        //this is causing a warning
        //https://facebook.github.io/react-native/docs/timers.html

        let secs = parseInt(this.props.countdownSecs, 10) || 0;
        let mins = parseInt(this.props.countdownMins, 10) || 0;

        this.state = {
            initialMins: mins,
            initialSecs: secs,
            mins: mins,
            secs: secs
        }
    }
    componentDidMount(){
        this.props.countDown 
        ? this.tickDown()
        : this.tickUp()
    }
    tickUp(){
        var timer = this;

        setTimeout(() => {
            let newSecs = timer.state.secs + 1;
            if(newSecs > 59){
                let newMins = timer.state.mins + 1;

                timer.setState({
                    mins: newMins,
                    secs: 0
                });
                timer.tickUp();
            } else {
                timer.setState({
                    secs: newSecs
                });
                timer.tickUp();
            }
        }, 1000); 
    }
    tickDown(){
        var timer = this;

        //if no secs or mins, dont start the timer or do anything
        if(this.state.initialMins === 0 && this.state.initialSecs === 0) return;

        setTimeout(() => {
            let newSecs = timer.state.secs - 1;
            if(newSecs < 0){
                let newMins = timer.state.mins - 1;

                if(newMins < 0){
                    //timer is up. execute fn.
                    this.props.onCountdownDone();

                    timer.setState({
                        mins: this.state.initialMins,
                        secs: this.state.initialSecs
                    });

                    timer.tickDown();
                } else{
                    timer.setState({
                        mins: newMins,
                        secs: 59
                    });
                    timer.tickDown();
                }
            } else {
                timer.setState({
                    secs: newSecs
                });
                timer.tickDown();
            }
        }, 1000);
    }
    render() {
        return (
            <span>
                {this.state.mins}:{(this.state.secs < 10 ? "0" : "") + this.state.secs}
            </span>
        );
    }
}

export default Timer;