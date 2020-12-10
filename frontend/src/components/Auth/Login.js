import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Login.css";
import { Redirect } from "react-router";
import { login } from "../../store/actions";
import { useDispatch } from "react-redux";
import SignUp from "./SignUp";

function Login(props) {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [toggle, setToggle] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  function handleEmail(e) {
    setAuth({ ...auth, email: e.target.value });
  }
  function handlePassword(e) {
    setAuth({ ...auth, password: e.target.value });
  }
  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(auth, history));
  }
  return !toggle ? (
    <div className="login">
      <div className="top-bar">
        <img src={logo} className="img-fluid" />
      </div>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square" />
                </span>
                <span>
                  <i className="fab fa-google-plus-square" />
                </span>
                <span>
                  <i className="fab fa-twitter-square" />
                </span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    value={auth.email}
                    className="form-control"
                    placeholder="email "
                    required
                    onChange={handleEmail}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    value={auth.password}
                    className="form-control"
                    placeholder="password"
                    required
                    onChange={handlePassword}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    defaultValue="Login"
                    className="btn float-right login_btn"
                    onClick={handleLogin}
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <Link onClick={()=>setToggle(!toggle)}>Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <SignUp setToggle={()=>setToggle(!toggle)} />
    </>
  );
}

export default Login;
