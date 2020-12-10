import React from "react";
import PropTypes from "prop-types";
import defaultImg from "../../assets/default-image.png";
import "./Mini_Ques.css";
Mini_Ques.propTypes = {
  id: PropTypes.number.isRequired,
  showTitle: PropTypes.string,
  showTime: PropTypes.string,
  showPoint: PropTypes.string,
  showImg: PropTypes.string,
  posAnswer: PropTypes.string,
};
Mini_Ques.defaultProps = {
  showTitle: "",
  showTime: "20",
  showPoint: "500",
  showImg: defaultImg,
  posAnswer: "0",
};

function Mini_Ques(props) {
  const {id, showTitle, showTime, showPoint, showImg, posAnswer } = props;
  const updateShowTitle = showTitle.length < 10 ? showTitle : `${showTitle.slice(0, 10)}...`;
  const showId = (id == "Preview") ? "Preview" : `${id + 1} Quiz`;
  const classMini = (id == "Preview") ? "preQues" : "show-mini-ques";
  const showBg = (id == "Preview" ) ? "white" : (id==props.currentId) ? "#a2fcba" : "rgb(242, 242, 242)";
  return (
    <div
      className={classMini}
    >
      <h6>{showId}</h6>
      <div className="infor-mini-ques" style={{ backgroundColor:showBg}}>
        <p className="text-center">
          {showTitle ? updateShowTitle : "Type your question"}
        </p>
        <div className="center-mini-ques">
          <div className="show-linhtinh">{showTime}</div>
          <div className="border-img">
            <img src={showImg} style={{ width: "100%" }} alt="mini_img"></img>
          </div>
          <div className="show-linhtinh">{showPoint}</div>
        </div>
        <div className="row mini-list-answer justify-content-md-center">
          <div
            className="col-md-5 mini-answer"
            style={{ backgroundColor: posAnswer == 1 && "#dc3545" }}
          ></div>
          <div
            className="col-md-5 mini-answer"
            style={{ backgroundColor: posAnswer == 2 && "#007bff" }}
          ></div>
          <div
            className="col-md-5 mini-answer"
            style={{ backgroundColor: posAnswer == 3 && "#ffc107" }}
          ></div>
          <div
            className="col-md-5 mini-answer"
            style={{ backgroundColor: posAnswer == 4 && "#28a745" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Mini_Ques;
