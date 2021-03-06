import React, { Component } from 'react';
import './Gameplay.css'
import Timer from '../../Timer/Timer';
import CodeArea from '../../CodeArea/CodeArea';
import FifoItem from './FifoItem/FifoItem';
import LifoItem from './LifoItem/LifoItem';

class Gameplay extends Component {
    constructor(props) {
      super(props);

      this.state = {
        complete: false,
        activeQuestion: null,
        viewingAnswer: false,
        usedQuestionIds: [],
        correctQuestions: [], 
        incorrectQuestions: [],
        fifoItems: [], //array of question arrays
        lifoItems: [] //array of questions
      };

      let lifoItems = [];

      for(let i = 0; i < props.gameSettings.lifoStartAmount; i++){
          lifoItems.push(this.getRandomQuestion());
      }

      this.state.lifoItems = lifoItems;
    }
    componentDidMount(){
        this.nextQuestion();
    }
    getRandomQuestion(){
        let usedQuestionIds = this.state.usedQuestionIds;

        let questions = this.props.questions.filter(q => {
            return usedQuestionIds.indexOf(q.id) === -1;
        });

        if(questions.length === 0) {
            //If no questions left, empty the array and clear the filter on questions
            usedQuestionIds.length = 0;
            questions = this.props.questions;
        }
        
        var randQuestion = questions[Math.floor(Math.random()*questions.length)];
        usedQuestionIds.push(randQuestion.id);

        //update used questions
        this.setState({
            usedQuestionIds: usedQuestionIds
        });
        
        return randQuestion;
    }
    nextQuestion(prevIncorrect = false){
        //Any logic handling the new state of the fifo/lifo items must be here.
        //Trying to set it before/after will clash the setState
        let fifoItems = [...this.state.fifoItems];
        let lifoItems = [...this.state.lifoItems];
        
        //First check if we need punish fifos, cant do this after the 'any' checks below
        if(prevIncorrect){
            let newFifoItem = [this.state.activeQuestion];

            for(let i = 0; i < this.props.gameSettings.fifoAmount; i++){
                newFifoItem.push(this.getRandomQuestion(this.state.activeQuestion.tags));
            }
    
            fifoItems.push(newFifoItem)
        }

        let anyFifo = fifoItems.length > 0;
        let anyLifo = lifoItems.length > 0;
        
        if(!anyLifo && !anyFifo) {
            this.setState({
                complete: true
            });
            return;
        } else if (!anyLifo) {
            //If no lifo, get the next fifo item and put its questions into lifo
            let firstFifo = fifoItems.shift();
            lifoItems = firstFifo;
        }
        
        let topLifo = lifoItems.pop();

        this.setState({
            activeQuestion: topLifo,
            fifoItems: fifoItems,
            lifoItems: lifoItems,
            viewingAnswer: false
        });

        setTimeout(() => {
            if(this.refs.responseCode && topLifo.codeResponse){
                this.refs.responseCode.value = "";
                this.refs.responseCode.focus();
            } else if(this.refs.responseText && !topLifo.codeResponse){
                this.refs.responseText.value = "";            
                this.refs.responseText.focus();
            }
        }, 100);
    }
    viewAnswer(){
        this.setState({
            viewingAnswer: true
        });
    }
    correctQuestion(){
        let correctQuestions = [...this.state.correctQuestions];
        correctQuestions.push(this.state.activeQuestion.id);
        
        this.setState({
            correctQuestions: correctQuestions
        });

        this.nextQuestion();
    }
    incorrectQuestion(){
        let incorrectQuestions = [...this.state.incorrectQuestions];
        incorrectQuestions.push(this.state.activeQuestion.id);

        this.setState({
            incorrectQuestions: incorrectQuestions
        });

        this.nextQuestion(true);
    }
    fifoCountdownDone(){
        let fifoItems = [...this.state.fifoItems];
        let newFifoItem = [];

        for(let i = 0; i < this.props.gameSettings.fifoAmount; i++){
            newFifoItem.push(this.getRandomQuestion(this.state.activeQuestion.tags));
        }

        fifoItems.push(newFifoItem);

        this.setState({
            fifoItems: fifoItems
        });
    }
    lifoCountdownDone(){        
        let lifoItems = [...this.state.lifoItems];  
        lifoItems.push(this.getRandomQuestion());

        this.setState({
            lifoItems: lifoItems
        }); 
    }
    completeClicked(){
        this.props.onComplete({
            correctQuestions: this.state.correctQuestions, 
            incorrectQuestions: this.state.incorrectQuestions
        });
    }
    onAnswerKeyPress(e){
        if (e.ctrlKey && (e.keyCode === 37 || e.keyCode === 39)){
            if(!this.state.viewingAnswer){
                this.setState({
                    viewingAnswer: true
                });
            } else {
                if(e.keyCode === 37){
                    this.incorrectQuestion();
                } else {
                    this.correctQuestion();
                }
            }
        }
    }
    render() {
        let activeQuestionArea = !this.state.activeQuestion 
        ? ''
        : (<div className="play-area">
            <div className="play-area-top">
                <div className={"question-area"}>
                    <div className={"answer-area " + (this.state.viewingAnswer ? '' : 'hidden')}>
                        {this.state.activeQuestion.codeResponse 
                            ? <CodeArea readOnly className="full-textarea" value={this.state.activeQuestion.answer} /> 
                            : <textarea readOnly className="full-textarea" value={this.state.activeQuestion.answer} />}
                    </div>
                    <div className="question-text">
                        {this.state.activeQuestion.questionText}
                    </div>
                    {this.state.activeQuestion.questionCode 
                        ? <CodeArea readOnly className="full-textarea" value={this.state.activeQuestion.questionCode} />
                        : ''
                    }
                </div>
                <div className="response-area">
                    {this.state.activeQuestion.codeResponse 
                        ? <CodeArea className="full-textarea" ref="responseCode" onKeyDown={this.onAnswerKeyPress.bind(this)} /> 
                        : <textarea className="full-textarea" ref="responseText" onKeyDown={this.onAnswerKeyPress.bind(this)} />}
                </div>
            </div>
            <div className="play-area-bottom">
                <button className={"play-area-button full-width " + (!this.state.viewingAnswer && !this.state.complete ? '' : 'hidden')} onClick={this.viewAnswer.bind(this)}>View Answer</button>
                <button className={"play-area-button incorrect-button " + (this.state.viewingAnswer && !this.state.complete ? '' : 'hidden')} onClick={this.incorrectQuestion.bind(this)}>I didn't answer well enough</button>
                <button className={"play-area-button correct-button " + (this.state.viewingAnswer && !this.state.complete ? '' : 'hidden')} onClick={this.correctQuestion.bind(this)}>I answered it perfectly</button>
                <button className={"play-area-button full-width " + (this.state.complete ? '' : 'hidden')} onClick={this.completeClicked.bind(this)}>Finish</button>
            </div>
        </div>);

        return (
        <div className="game">
            <div className="game-top">
                <div className="game-logo">
                    <div className="fifo-red">
                        FIFO: <Timer countDown={true} onCountdownDone={this.fifoCountdownDone.bind(this)} countdownMins={this.props.gameSettings.fifoMins} />
                    </div>
                    <div className="lifo-blue">
                        LIFO: <Timer countDown={true} onCountdownDone={this.lifoCountdownDone.bind(this)} countdownMins={this.props.gameSettings.lifoMins}/>
                    </div>
                    <div>
                        TIME: <Timer ref="gameTimer" />
                    </div>
                </div>
                <div className="fifo-queue">
                    {this.state.fifoItems.map((ft, i) => <FifoItem key={i} questions={ft} />)}
                </div>
            </div>
            <div className="game-bottom">
                <div className="lifo-stack">
                    {this.state.lifoItems.map((li, i) => <LifoItem key={i} question={li} />)}
                </div>
                {activeQuestionArea}
            </div>
        </div>)
    }
};

export default Gameplay;