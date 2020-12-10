import React, { useState } from "react";
import "./Landing.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Kwizz from "../../assets/logo.svg";
import Stars from "../animations/Stars";
import Player from "./Player";
function Player_Room(props) {
  const [pin, setPin] = useState("");
  const [nickname, setNickName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [togglePlayer, setTogglePlayer] = useState(false)
  function handleSetPin(e) {
    setPin(e.target.value);
  }
  function handleNicknameInput(e) {
    setNickName(e.target.value);
  }
  function handleToggle(e) {
    setToggle(true);
  }
  function handleGo(e) {
    setTogglePlayer(true)
  }
  return (
    !togglePlayer
      ?
          <div className="component-container">
      <div>
        <Stars />
      </div>
      {!toggle ? (
        <div className="landing-wrapper">
          <div className="logo-container">
            <img src={Kwizz} alt="Kwizz logo" className="logo" />
          </div>
          <div className="player-input-wrapper">
            <input
              type="number"
              value={pin}
              placeholder="Kwizz! PIN"
              onChange={handleSetPin}
              className="input-user"
            />
            <button onClick={handleToggle} className="btn-enter">
              Enter
            </button>
          </div>
        </div>
      ) : (
        <div className="landing-wrapper">
          <div className="logo-container">
            <img src={Kwizz} alt="Kwizz logo" className="logo" />
          </div>
          <div className="player-input-wrapper">
            <input
              type="text"
              value={nickname}
              placeholder="Nickname"
              onChange={handleNicknameInput}
              className="input-user"
            />
              <button onClick={handleGo} className="btn-enter">
                OK, go!
              </button>
          </div>
        </div>
      )}
      </div>
      :
        <Player pin={pin} nickName={nickname}/>
  );
}

export default Player_Room;
