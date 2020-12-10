import React, {useState} from "react";
import "./Header.css";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions";
import Home from "./Home";
function Header(props) {
  const [posAcitve, setposAcitve] = useState("home")
  const dispatch = useDispatch();
  var style = "active"
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <div>
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="logo" height="50" />
      </a>
      <div className="collapse navbar-collapse " id="collapsibleNavbarLeft">
        <ul className="navbar-nav  mx-2 ">
            <li className={`nav-item li-tab mx-2 ${(posAcitve=="home")&&style}`}  name="home"  onClick={(e)=>setposAcitve(e.target.name)}>
            <Link className="nav-link" to="/">
              <i className="fas fa-home"></i>
              {" Home"}
            </Link>
          </li>
          <li className={`nav-item li-tab mx-2 ${(posAcitve=="kahoot")&&style}`}  name="kahoot" onClick={(e)=>setposAcitve(e.target.name)}>
            <Link className="nav-link" to="/kahoot">
              <i className="fas fa-list"></i>
              {" Kahoot"}
            </Link>
          </li>
          <li className={`nav-item li-tab mx-2 ${(posAcitve=="report")&&style}`} name="report" onClick={(e)=>setposAcitve(e.target.name)}>
            <a className="nav-link" href="#">
              <i className="fas fa-chart-line"></i>
              {" Report"}
            </a>
          </li>
        </ul>
      </div>
      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbarRight"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="collapsibleNavbarRight">
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item li-tab">
            <Link to="/create">
              <button className="nav-link create-button">Create</button>
            </Link>
          </li>
          <li className="nav-item li-tab">
            <Link to="/wait">
              <button className="nav-link create-button">Play</button>
            </Link>
          </li>
          <li className="nav-item li-tab">
            <Link to="/login">
              <button
                className="nav-link create-button"
                onClick={handleLogout}
                style={{backgroundColor:"rgb(198, 9, 41)"}}
              >
                Log Out
              </button>
            </Link>
          </li>
        </ul>
      </div>
      </nav>
      {/* <Home/> */}
    </div>

  );
}

export default Header;
