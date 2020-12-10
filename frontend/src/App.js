import React, { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./Quiz";
import Game from "./components/Game/Game";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/CreateKahoot/Create";
import Player_Room from "./components/Player_Room/Landing";
import Player from "./components/Player_Room/Player";
import Kahoot from "./components/Kahoot/Kahoot";
import Edit from "./components/CreateKahoot/Edit";
import Ques_Over from "./components/Game/Ques_Over";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log(token);
  }, [token]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <Router>
      <div className="app">
        {!token ? (
          <>
            <Route path="/" component={Login} />
          </>
        ) : (
          <>
            <Route path="/" exact component={Home} />
          </>
        )}
        <Route path="/kahoot" component={Kahoot} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/create" component={Main} />
        <Route path="/game" component={Game} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/wait" component={Player_Room} />
        <Route path="/player" component={Player} />
        <Route path="/game2" component={Quiz} />
        <Route path="/edit" component={Edit} />
        <Route path="/test" component={Ques_Over} />
      </div>
    </Router>
  );
}

export default App;
