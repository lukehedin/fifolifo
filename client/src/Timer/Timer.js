import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);

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
        //if no secs or mins, dont start the timer or do anything
        if(this.state.initialMins === 0 && this.state.initialSecs === 0) return;

        this.props.countDown 
        ? this.tickDown()
        : this.tickUp()
    }
    tickDown(){
        var timer = this;

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
            <div>
                {this.state.mins}:{(this.state.secs < 10 ? "0" : "") + this.state.secs}
            </div>
        );
    }
}

export default Timer;