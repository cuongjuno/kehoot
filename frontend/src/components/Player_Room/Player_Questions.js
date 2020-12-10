import React from "react";
import "./Game.css";
import triangle from "../../Assests/triangle.svg";
import diamond from "../../Assests/diamond.svg";
import square from "../../Assests/square.svg";
import circle from "../../Assests/circle.svg";

export default function PlayerQuestion(props) {
  return (
    <div className="answers-container row">
      <div
        className="col-md-6"
        style={{ backgroundColor: "rgb(208, 25, 55)" }}
        onClick={() => props.submitAnswer(1)}
      >
        <img src={triangle} alt="" style={{ width: "140px" }} />
      </div>
      <div
        className="col-md-6"
        style={{ backgroundColor: "rgb(18, 96, 190)" }}
        onClick={() => props.submitAnswer(2)}
      >
        <img src={diamond} alt="" style={{ width: "140px" }} />
      </div>
      <div
        className="col-md-6"
        style={{ backgroundColor: "rgb(199, 146, 0)" }}
        onClick={() => props.submitAnswer(3)}
      >
        <img src={square} alt="" style={{ width: "140px" }} />
      </div>
      <div
        className="col-md-6"
        style={{ backgroundColor: "rgb(35, 126, 11)" }}
        onClick={() => props.submitAnswer(4)}
      >
        <img src={circle} alt="" style={{ width: "140px" }} />
      </div>
    </div>
  );
}
