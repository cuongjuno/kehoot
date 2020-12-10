import React from "react";
import ReactDOM from "react-dom";
import { Link, Switch } from "react-router-dom";
import "./user.css";
import image_logo  from "../assets/logo.svg"

function Header_2() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav-header">
                <Link to={"/"}>
                    <img src={image_logo} alt="logo" width={100} height={35} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav nav-tabs ul-tabs">
                        <li className="nav-item li-tab">
                            <Link to={"/"} className="nav-link">
                                <i class="fas fa-home"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item li-tab">
                            <Link to={"/kahoots"} className="nav-link">
                                <i class="fas fa-list"></i>
                                Kahoots
                            </Link>
                        </li>
                        <li className="nav-item li-tab">
                            <Link to={"/user-reports"} className="nav-link">
                                <i class="fas fa-chart-line"></i>
                                Reports
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to={"/player"}>
                    <button type="button" className="create-button">
                        Player
                    </button>
                </Link>
                <Link to={"/user"}>
                    <button type="button" className="create-button">
                        Play
                    </button>
                </Link>
                <Link to={"/creator"}>
                    <button type="button" className="create-button">
                        Create
                    </button>
                </Link>
                <div className="dropdown dropdown-person">
                    <i class="fas fa-user-circle"></i>
                    <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton"
                    >
                        <h6 className="dropdown-header">User Name</h6>
                        <Link to={"/settings"} className="dropdown-item">
                            Setting
                        </Link>
                        <hr />
                        <div  onClick={()=>{ if(localStorage.getItem('token')){ localStorage.removeItem('token')} }}> 
                        <Link to={'/auth/login'} className="dropdown-item" style={{paddingLeft: "15px", color: "red"}}>
                            <i class="fas fa-chevron-circle-right"></i>
                            Sign Out
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </nav>
            {/* <RouterPathHeader /> */}
        </div>
    );
}

export default Header_2;