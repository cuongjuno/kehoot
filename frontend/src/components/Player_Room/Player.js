import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";

// import "./Game.css";
import load from "../../Assests/load-circle-outline.svg";
import PlayerQuestionOver from "./Player_Question_Over";
import PlayerQuestions from "./Player_Questions";
const ENDPOINT = "127.0.0.1:5000/";

function Player(props) {
  const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
  const { pin, nickName } = props;
  const [gameStarted, setGameStarted] = useState(false);
  const [questionOver, setquestionOver] = useState(false);
  const [answerSubmitted, setanswerSubmitted] = useState(true);
  const [answeredCorrect, setansweredCorrect] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [score, setscore] = useState(0);
  const [increScore, setIncreScore] = useState(0)

  useEffect(() => {
    console.log("re-render");
    socket.emit("player-joined", pin);
    socket.emit("player-add", { pin, nickName });
    socket.on("room-joined", (data) => {
      console.log("Quiz data: " + data);
    });
    socket.on("question-over", () => {
      setquestionOver(true);
      console.log("set ques");
    });
    socket.on("time-over", () => {
      setTimeOver(true);
    });
    socket.on("next-question", () => {
      console.log("next");
      setGameStarted(true);
      setquestionOver(false);
      setTimeOver(false);
      setanswerSubmitted(false);
      setansweredCorrect(false);
    });
    socket.on("sent-info", (data) => {
      setansweredCorrect(data.answeredCorrect);
      setscore(score + data.score);
      setIncreScore(data.score)
    });
  }, []);
  function submitAnswer(num) {
    socket.emit("question-answered", { name: nickName, answer: num, pin: pin });
    setanswerSubmitted(true);
  }

  return (
    <div className="player-container">
      <div className="status-bar ">
        <div className="status-pin">Pin : {pin}</div>
        <div className="status-name">{nickName}</div>
        <div className="status-score">{score}</div>
      </div>

      {
        // gameStarted= true questionOver = true
        !gameStarted && !questionOver && (
          <div className="youarein">
            <p>You're in!</p>
            <p style={{ fontSize: "1.5rem" }}>See your nickname on screen?</p>
          </div>
        )
      }

      {gameStarted && !questionOver && !answerSubmitted && (
        <PlayerQuestions submitAnswer={submitAnswer} />
      )}

      {gameStarted && !questionOver && answerSubmitted && (
        <div className="waiting-for-results">
          <p className="answer-indicator" id="too-fast">
            Did You answer too fast????
          </p>
          <img src={load} alt="" className="load-circle" />
        </div>
      )}
      {questionOver && <PlayerQuestionOver answeredCorrect={answeredCorrect} increScore={increScore}/>}

      {/* {!gameStarted && !questionOver ? ( */}
      {/* {false ? (
        <div>
          <p>You're in!</p>
          <div className="answer-container">
            <div className=" q-blank q1"></div>
            <div className=" q-blank q2"></div>
            <div className=" q-blank q3"></div>
            <div className=" q-blank q4"></div>
          </div>
        </div>
      ) : gameStarted && !questionOver && !answerSubmitted ? (
        <PlayerQuestions submitAnswer={submitAnswer} />
      ) : gameStarted && !questionOver && answerSubmitted ? (
        <div className="waiting-for-results">
          <p className="answer-indicator" id="too-fast">
            Did You answer too fast????
          </p>
          <img src={load} alt="" className="load-circle" />
        </div>
      ) : (
        <PlayerQuestionOver answeredCorrect={answeredCorrect} />
      )} */}
    </div>
  );
}

export default Player;
