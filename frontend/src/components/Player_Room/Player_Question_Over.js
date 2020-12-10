import React from "react";
import "./playerover.css"
function Player_Question_Over(props) {
  var style = {
    backgroundColor: "rgb(102, 191, 57)",
    height: "88vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  var style2 = {
    backgroundColor: "rgb(255, 51, 85)",
    height: "88vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div>
      {props.answeredCorrect ? (
        <div className="ques-correct" style={style}>
          <h1
            className="alert-p"
            style={{ marginTop: "-10%", marginBottom: "0" }}
          >
            Correct
          </h1>
          <i class="fas fa-check fa-5x"></i>
          <p className="box-p">{"+ "} { props.increScore}</p>
        </div>
      ) : (
        <div className="ques-incorrect" style={style2}>
          <h1
            className="alert-p"
            style={{ marginTop: "-10%", marginBottom: "0" }}
          >
            Incorrect
          </h1>
          <i class="fas fa-times-circle fa-5x"></i>
          <p className="box-p">Sai rồi bạn ơi TT</p>
        </div>
      )}
    </div>
  );
}

export default Player_Question_Over;
