import React from "react";
import GameOver from "./Game_Over";
import "./Ques_Over.css";

export default function GameQuestionOver(props) {
  let chart = [...props.leaderboard];
  let sorted = chart.sort((a, b) => b.score - a.score);
  return (
    <div>
      {!props.lastQuestion ? (
        <div>
          <div className="board-1">
            <h1>Score Board</h1>
          </div>
          <div className="board-2">
            <button className=" btn-over btn btn-primary" onClick={props.nextQuestion}>
              Next
            </button>
            <div className="board-3">
              <p>{sorted[0].name}</p>
              <p>{sorted[0].score}</p>
            </div>
            <div className="board-3">
              <p>{sorted[1].name}</p>
              <p>{sorted[1].score}</p>
            </div>
            <div className="board-3">
              <p>{sorted[2].name}</p>
              <p>{sorted[2].score}</p>
            </div>
          </div>
        </div>
      ) : (
        <GameOver leaderboard={props.leaderboard} />
      )}
    </div>
  );
}
