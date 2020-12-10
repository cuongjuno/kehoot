import React from "react";
import { Link } from "react-router-dom";
// import Zoom from '../../components/animations/zoomin.js';
import "./Game.css";

export default function GameOver(props) {
  let chart = [...props.leaderboard];
  let sorted = chart.sort((a, b) => b.score - a.score);
  return (
    <div>
      <div>
        <div className="board-1">
          <h1>Game Over</h1>
        </div>
        <div className="board-2">
          <div className="board-3">
            <p>
              {"1st "}
              {sorted[0].name}
            </p>
            <p>{sorted[0].score}</p>
          </div>
          <div className="board-3">
            <p>
              {"2nd "}
              {sorted[1].name}
            </p>
            <p>{sorted[1].score}</p>
          </div>
          <div className="board-3">
            <p>
              {"3rd "}
              {sorted[2].name}
            </p>
            <p>{sorted[2].score}</p>
          </div>
        </div>
      </div>
      <Link to="/kahoot">
        <button className="btn-newGame" style={{position:"absolute", top:"25%", right:"3%"}}>Start a new Game?</button>
      </Link>
    </div>
  );
}
