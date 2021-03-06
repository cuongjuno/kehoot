import React from 'react';
import './Game.css';
import triangle from '../../Assests/triangle.svg'
import diamond from '../../Assests/diamond.svg'
import square from '../../Assests/square.svg'
import circle from '../../Assests/circle.svg'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
export default function GameQuestions(props) {
  var flag = "false";
    var time = props.timeCoundown ? props.timeCoundown : 5;
  var question = {
    height: "17vh",
    backgroundColor: "#FFFFFF",

    fontSize: "2.5rem",
    fontWeight: "600",
  };
  var detail = {
    height: "50vh",
  };
  var styleButton = {
    height: "15vh",
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  // if(time==0) alert(e.target.value);
  return (
    <div
      style={{ backgroundColor: "#F2F2F2", height: "100vh", overflow: "auto" }}
    >
      <div
        className=" justify-content-center d-flex align-items-center"
        style={question}
      >
        <p>{props.question} </p>
      </div>
      <div className="row coitainer-fluid">
        <div
          className="col-md-2 time-wrapper d-flex justify-content-center align-items-center "
          style={detail}
        >
          <CountdownCircleTimer
            onComplete={() => {
              props.questionOver();
              // do your stuff here
              // repeat animation in 1.5 seconds
            }}
            isPlaying
            size={150}
            duration={props.timeCoundown ? props.timeCoundown : 5}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        <div className="col-md-8">
          <img
            src={props.urlImg}
            className="mx-auto  d-block img-fluid"
            style={detail}
          />
        </div>
        <div
          className="col-md-2 d-flex justify-content-center  text-center align-items-center"
          style={{ fontSize: "50px", fontWeight: "600" }}
        >
          {props.countAnswer}
          <br />
          answers
        </div>
      </div>
      <div className="coitainer-fluid row">
        <button className="col-md-6 bg-danger" style={styleButton}>
          {props.answer1}
        </button>
        <button className="col-md-6 bg-primary" style={styleButton}>
          {props.answer2}
        </button>
        <button className="col-md-6 bg-warning" style={styleButton}>
          {props.answer3}
        </button>
        <button className="col-md-6 bg-success" style={styleButton}>
          {props.answer4}
        </button>
      </div>

      <div className></div>
    </div>
  );
}