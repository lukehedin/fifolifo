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
    }
    componentDidMount(){
        let lifoItems = [];

        for(let i = 0; i < this.props.gameSettings.lifoStartAmount; i++){
            lifoItems.push(this.getRandomQuestion());
        }

        this.state.lifoItems = lifoItems;

        this.nextQuestion();
    }
    getRandomQuestion(tags = null){
        //TODO tag filter
        let questions = this.props.questions.filter(q => {
            return this.state.usedQuestionIds.indexOf(q.id) === -1;
        });

        if(questions.length === 0) {
            //reset used questions
            this.state.usedQuestionIds = [];
            return this.getRandomQuestion(tags);
        } else{
            var randQuestion = questions[Math.floor(Math.random()*questions.length)];
            this.state.usedQuestionIds.push(randQuestion.id);
            return randQuestion;
        }
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
    render() {
        let activeQuestionArea = !this.state.activeQuestion 
        ? ''
        : (<div className="play-area">
            <div className="play-area-top">
                <div className={"question-area " + (this.state.viewingAnswer ? 'hidden' : '')}>
                    <div className="question-text">
                        {this.state.activeQuestion.questionText}
                    </div>
                    {this.state.activeQuestion.questionCode 
                        ? <CodeArea readOnly className="full-textarea" value={this.state.activeQuestion.questionCode} />
                        : ''
                    }
                </div>
                <div className={"answer-area " + (this.state.viewingAnswer ? '' : 'hidden')}>
                    {this.state.activeQuestion.codeResponse 
                        ? <CodeArea readOnly className="full-textarea" value={this.state.activeQuestion.answer} /> 
                        : <textarea readOnly className="full-textarea" value={this.state.activeQuestion.answer} />}
                </div>
                <div className="response-area">
                    {this.state.activeQuestion.codeResponse 
                        ? <CodeArea className="full-textarea" /> 
                        : <textarea className="full-textarea" />}
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