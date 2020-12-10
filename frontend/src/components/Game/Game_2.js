import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import io from "socket.io-client";
import { debounce, duration } from "@material-ui/core";
import GameQuestions from "./Game_Questions";
import GameQuestionOver from "./Game_Question_Over";
import "./Game.css";
import logo from "../../assets/logo.svg";
import listKahoot from "./listKahoot.json";
import socketIOClient from "socket.io-client";
import { db, storage } from "../../firebase";
const ENDPOINT = "127.0.0.1:5000/";
function Game(props) {
  // const [state, setState] = useState({
  //   pin: 0,
  //   timer: 0,
  //   isPlaying: false,
  //   gameOver: false,
  //   questionOver: false,
  //   currentQuestion: 0,
  //   listQuestion: listKahoot.listQuestion,
  //   listPlayer: [],
  //   charts: [5],
  // });
  const [pin, setPin] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  const [questionOver, setquestionOver] = useState(false);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [listQuestion, setlistQuestion] = useState([]);
  const [listPlayer, setlistPlayer] = useState([]);
  const [charts, setcharts] = useState([5]);
  const [socket, setSocket] = useState(socketIOClient(ENDPOINT));
  const [dataAnswer, setDataAnswer] = useState({
    name: "",
    answer: "",
  });

  async function loadKahoot() {
    let newData = db.collection("kahoot_2").doc("Zs04fF2HDkbj6EI30OWO");
    await newData
      .get()
      .then(function (docRef) {
        console.log(docRef.data().listQuestion);
        setlistQuestion(docRef.data().listQuestion);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  useEffect(() => {
    loadKahoot();
    generatePin();
    socket.on("connection", () => {
      console.log("conntected frontend");
    });
    // tạo mã pin
    // ==> get data from DB
    socket.on("room-joined", (data) => {
      addPlayer(data.name, data.id);
    });
    socket.on("player-answer", (data) => {
      console.log(" player-answer " + data.name + " " + data.answer);
      setDataAnswer({
        name: data.name,
        answer: data.answer,
      });
      // submitAnswer(data.name, data.answer);
    });
  }, []);

  useEffect(() => {
    if (listPlayer.length > 0) submitAnswer(dataAnswer.name, dataAnswer.answer);
  }, [dataAnswer]);
  function generatePin() {
    // console.log(listPlayer)
    let newPin = Math.floor(Math.random() * 9000000, 10000000);
    socket.emit("host-join", { pin: newPin });
    setPin(newPin);
    // const socket = io("/");

    // ==> đưa pin lên db
  }
  // useEffect(() => {
  //     socket.on("player-answer", (data) => {
  //     console.log(" player-answer " + data.name + " " + data.answer);
  //     submitAnswer(data.name, data.answer);
  //     });
  // }, [listPlayer])
  function addPlayer(name, id) {
    let player = {
      id: id,
      name: name,
      score: 0,
      qAnswered: false, // da tra loi chua
      answeredCorrect: false, // tra loi dung chua
    };
    // them player vao list
    // setState((prevState) => {
    //   return {
    //     ...prevState,
    //     listPlayer: [...prevlistPlayer, player],
    //   };
    // });
    setlistPlayer((preState) => {
      return [...preState, player];
    });
  }
  function submitAnswer(name, answer) {
    console.log("submit answer" + name + " " + answer);
    // // => lay ra Player vua submit
    // let playerSummited = listPlayer.filter(
    //   (player) => player.name === name
    // );
    // console.log(playerSummited);
    // let updatedListPlayer = listPlayer.filter(
    //   (player) => player.name !== name
    // );
    // console.log(updatedListPlayer);
    // playerSummited[0].qAnswered = true; // chuyen state da tra loi cau hoi

    // answer === listQuestion[currentQuestion].posCorrect
    //   ? (playerSummited[0].answeredCorrect = true)
    //   : (playerSummited[0].answeredCorrect = false);
    // updatedListPlayer.push(playerSummited[0]); // them lai player vua submit vao list
    // // setState({ ...state, listPlayer: updatedListPlayer });
    // setlistPlayer(updatedListPlayer)
    setlistPlayer(
      listPlayer.map((x) => {
        if (x.name === name && x.answeredCorrect === answer)
          return { ...x, qAnswered: true, answeredCorrect: true };
        if (x.name === name)
          return { ...x, qAnswered: true, answeredCorrect: false };
        return x;
      })
    );
  }
  function getChartsScore() {
    let unsorted = [...listPlayer];
    let sorted = unsorted.sort((a, b) => b.score - a.score);
    // setState({ ...state, charts: sorted.slice(0, 5) });
    setcharts(sorted.slice(0, 5));
  }
  function handleQuestionOver() {
    socket.emit("question-over", pin);
    let updatedListPlayer = [...listPlayer];
    updatedListPlayer.forEach((player) => {
      player.qAnswered = false;
      player.answeredCorrect = false;
    });
    // setlistPlayer(listPlayer.map((player) => {
    //   return {...player, qAnswered: false, answeredCorrect: false}
    // }))
    getChartsScore();
    // setState({
    //   ...state,
    //   isPlaying: true,
    //   questionOver: true,
    //   currentQuestion: currentQuestion + 1,
    //   listPlayer: updatedListPlayer,
    // });
    setisPlaying(true);
    setquestionOver(true);
    setcurrentQuestion(currentQuestion + 1);
    setlistPlayer(updatedListPlayer);
  }
  function timeKeeper() {
    let internalTimer = listQuestion[currentQuestion].time;
    // let internalTimer = 20;
    // setState({...state, listQuestion:listX})
    let cloneListPlayer = [...listPlayer];
    // setState({ ...state, questionOver: false });
    // console.log("list-player")
    // console.log(listPlayer)
    setquestionOver(false);
    function timeCheck() {
      console.log("list-player");
      console.log(listPlayer);
      let checkAnswer = () => {
        // console.log("list-player")
        // console.log(listPlayer)
        let pAnswered = 0;
        listPlayer.forEach((player) => {
          if (player.qAnswered) pAnswered++; // dem so nguoi da tra loi
        });
        console.log("timekeeper" + pAnswered);
        cloneListPlayer.forEach((player) => {
          if (player.answeredCorrect) {
            if (pAnswered === listPlayer.length)
              player.score +=
                (internalTimer - 2) *
                Math.round(listQuestion[currentQuestion].point / internalTimer);
            else
              player.score += Math.round(
                listQuestion[currentQuestion].point / internalTimer
              );
            console.log("dkmcsfdmsaf");
            socket.emit("sent-info", {
              id: player.id,
              score: player.score,
              answeredCorrect: player.answeredCorrect,
            });
          }
        });
        // ==> đổ dữ liệu player vào mới hoạt động
        if (pAnswered === listPlayer.length) internalTimer = 0;
        internalTimer -= 1;
      };
      let endQuestion = () => {
        clearInterval(timeKept);
        handleQuestionOver();
      };
      return internalTimer > 0
        ? checkAnswer() // kiem tra dap an, tinh toan score
        : endQuestion(); // ket thuc cau hoi
    }
    let timeKept = setInterval(() => {
      timeCheck();
    }, 1000); // lap lai timeCheck sau 1s
    return timeKept;
  }
  function nextQuestion() {
    console.log("nexy-question");
    timeKeeper(); // tinh diem score
    if (currentQuestion === listQuestion.length)
      // setState({ ...state, gameOver: true });
      setgameOver(true);
    socket.emit("next-question", pin); // push pin len
    // setState({ ...state, questionOver: false });
    setquestionOver(false);
  }

  function startGame() {
    if (listPlayer.length >= 3) {
      nextQuestion();
      // setState({ ...state, isPlaying: true });
      setisPlaying(true);
    } else {
      alert("You need at least 3 players to start");
    }
  }
  var mappedPlayersInRoom = listPlayer.map((player) => {
    return (
      <div key={player.id} className="col-md-2 p-5">
        <span>{player.name}</span>
      </div>
    );
  });
  var Charts = () => {
    let chart = [...props.leaderboard];
    let sorted = chart.sort((a, b) => b.score - a.score);

    return (
      <div>
        <h2 className="leaderBoard">1st Place: {sorted[0].name}</h2>
        <h2 className="leaderBoard">2nd Place: {sorted[1].name}</h2>
        <h2 className="leaderBoard">3nd Place: {sorted[2].name}</h2>
      </div>
    );
  };
  return (
    <div className="component-container">
      {!isPlaying && (
        <div className="test">
          <div className="test_2">
            <div className="test_3">
              <div className="test_4">
                <div className="test_5">
                  <div className="test_6">
                    <div>
                      Join at <strong>www.kahoot.it</strong>
                    </div>
                    <div>
                      or with the <strong>Kahoot! app</strong>
                    </div>
                  </div>
                </div>
                <div className="test_5_1">
                  <div className="test_5_1_a">Game PIN:</div>
                  <div className="test_5_1_b">{pin}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className='pin' id='player-pin'> */}
      {/* Pin Code: {pin} */}
      {/* <div id='player-pin'></div> */}
      {/* <div>{pin}</div> */}
      {/* </div>  */}
      {!isPlaying && !questionOver && !gameOver ? (
        <div>
          <div className="btn-players row justify-content-between">
            <div className="col-md-2">
              <div className="player-count">
                <span
                  className="icon__Icon-xvsbpg-0 bJpEJN player-counter__Icon-fb3lj4-1 iItBrS"
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    width: "4vmin",
                    height: "4vmin",
                  }}
                >
                  <svg
                    id="icon1"
                    data-functional-selector="icon"
                    viewBox="0 0 32 32"
                    focusable="false"
                    stroke="none"
                    strokeWidth={0}
                  >
                    <path
                      d="M16,16 C13.2385763,16 11,13.7614237 11,11 C11,8.23857625 13.2385763,6 16,6 C18.7614237,6 21,8.23857625 21,11 C21,13.7614237 18.7614237,16 16,16 Z M25,24.3125 L7,24.3125 C7,20.2739178 11.0294373,17 16,17 C20.9705627,17 25,20.2739178 25,24.3125 Z"
                      style={{ fill: "rgb(255, 255, 255)" }}
                    ></path>
                  </svg>
                </span>
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "3.5vmin",
                    lineHeight: "3.7vmin",
                  }}
                >
                  {listPlayer.length}
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <img src={logo} alt="logo" height="55" />
            </div>
            <div className="col-md-2 ">
              <button onClick={() => startGame()} className="btn-play ">
                Play
              </button>
            </div>
          </div>
          <section className="list-player-joined">
            <div className="row justify-content-around ">
              {mappedPlayersInRoom}
            </div>
          </section>
        </div>
      ) : isPlaying && !questionOver && !gameOver ? (
        <GameQuestions
          timeCoundown={listQuestion[currentQuestion].time}
          question={listQuestion[currentQuestion].title}
          answer1={listQuestion[currentQuestion].answers[0]}
          answer2={listQuestion[currentQuestion].answers[1]}
          answer3={listQuestion[currentQuestion].answers[2]}
          answer4={listQuestion[currentQuestion].answers[3]}
          questionOver={questionOver}
          urlImg={listQuestion[currentQuestion].urlImgQues}
          leaderboard={listPlayer}
        />
      ) : (
        <GameQuestionOver
          nextQuestion={nextQuestion}
          charts={Charts}
          leaderboard={listPlayer}
          lastQuestion={listQuestion.length === currentQuestion}
        />
      )}
    </div>
  );
}

export default Game;
