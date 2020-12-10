import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import img from './assets/header-logo.png'
import gif_1 from './assets/kahootGif_1.gif'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
Quiz.propTypes = {
    time: PropTypes.number,
    numUser: PropTypes.number,
    numAnswer: PropTypes.number
};
Quiz.defaultProps={
    time:10,
    numUser:0,
    numAnswer:0
}

function Quiz(props) {
    const {time, numAnswer, numUser} = props;
    const [a,setA]=useState(0);
    const arrQuiz = {
        quesContent: "Hoi cai gi vay?",
        imgUrl: gif_1,
        // imgUrl:"https://media.nationalgeographic.org/assets/photos/220/301/a5bc8ebe-f0bb-44cd-bf0c-c12bc44c8260_c320-0-2240-1440_r800x600.jpg?7f21f614c56341058c18fdaf497b194f5126f021",
        arrAnswer: ["afsdf0","adsfdasfds","sadfasdsad","sdfasafd4"],
        correctAnswer: "afsdf0",
        time:3
    }
    var flag="false"

    var question={
        height: "17vh",
        backgroundColor: "#FFFFFF",

        fontSize:"2.5rem",
        fontWeight:"600",
    }
    var detail={
        height: "50vh",
    }
    var styleButton={
        height:"15vh",
        fontSize:"1.5rem",
        fontWeight:"600",
    }
    function renderTime({remainingTime}){
        if(remainingTime==0) flag="true"
        return(
            <div className="time-wraper">
                <div key={remainingTime}>{remainingTime}</div>
            </div>
        )
    }
    // if(time==0) alert(e.target.value);
    function checkAnswer(e){
        if(e.target.value==arrQuiz.correctAnswer) console("ok")
    }
    return (
        <div style={{backgroundColor:"#F2F2F2",height:"100vh",overflow: "auto"}}>
                <div className=" justify-content-center d-flex align-items-center" style={question}>
                        <p>{arrQuiz.quesContent} </p>
                </div>
            <div  className="row coitainer-fluid">
                    <div className="col-md-2 time-wrapper d-flex justify-content-center align-items-center " style={detail}>
                        <CountdownCircleTimer
                            onComplete={() => {
                                // do your stuff here
                                return [true, 1500] // repeat animation in 1.5 seconds
                                }}
                            isPlaying
                            size={150}
                            duration={arrQuiz.time}
                            colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                            ]}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                    <div className="col-md-8">
                        <img src={arrQuiz.imgUrl} className="mx-auto  d-block img-fluid" style={detail}/>  
                    </div>
                    <div className="col-md-2 d-flex justify-content-center  text-center align-items-center" style={{fontSize:"50px", fontWeight:"600"}}>
                        {numAnswer}
                        <br/>
                        answers
                    </div>
            </div>
            <div className="coitainer-fluid row">
                <button className="col-md-6 bg-primary" value={arrQuiz.arrAnswer[0]} style={styleButton} onClick={e => checkAnswer(e, "value")}>{arrQuiz.arrAnswer[0]}</button>
                <button className="col-md-6 bg-danger"  value={arrQuiz.arrAnswer[1]} style={styleButton} onClick={e => checkAnswer(e, "value")}>{arrQuiz.arrAnswer[1]}</button>
                <button className="col-md-6 bg-success" value={arrQuiz.arrAnswer[2]} style={styleButton} onClick={e => checkAnswer(e, "value")}>{arrQuiz.arrAnswer[2]}</button>
                <button className="col-md-6 bg-warning" value={arrQuiz.arrAnswer[3]} style={styleButton} onClick={e => checkAnswer(e, "value")}>{arrQuiz.arrAnswer[3]}</button>
                
            </div>


            <div className></div>
        </div>

    );
}

export default Quiz;