import React, { useState } from "react";
import "./SignUp.css";
import { Link, Redirect } from "react-router-dom";
import classnames from 'classnames';
import axios from '../../axios'
function SignUp(props) {
    const [stateForm, setstateForm]= useState({
        userName:'',
        dob:'',
        email:'',
        password:'',
        rePass:'',
    })
    const [stateError, setstateError] = useState('')
    const [stateFormErr, setstateFormErr]= useState({
        userNameErr:'',
        dobErr:'',
        emailErr:'',
        passwordErr:'',
        rePassErr:'',
    })
    const [isDone, setisDone] = useState(false)
    function handleSignup(e){
      e.preventDefault();
      var formPost = {
        username:stateForm.userName,
        age:15,
        email:stateForm.email,
        password:stateForm.password,
      }
      
        axios.post('http://localhost:5000/api/v1/auth/signup',formPost)
        .then(res=>{
          alert('Dang ky thanh cong!')
          setisDone(true)
        })
        .catch(error=>{
          console.log(error);
          setstateError('User with this email is already exist !')
        })
    }
    function handleChange(e,name){
        const user={};
        const emailRegEx = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        user[name]=e.target.value;
        switch (name) {
            case 'username':
                setstateForm({...stateForm, userName:user.username});
                user.username.length<6 ? setstateFormErr({...stateFormErr, userNameErr:'User name be at least 6 characters'}):setstateFormErr({...stateFormErr, userNameErr:''})
                break;
            case 'dob':
                setstateForm({...stateForm, dob:user.dob});
                break;
            case 'email':
                setstateForm({...stateForm, email:user.email});
                !emailRegEx.test(user.email) ? setstateFormErr({...stateFormErr, emailErr:'Invalid email!'}):setstateFormErr({...stateFormErr, emailErr:''})
                break;
            case 'password':
                setstateForm({...stateForm, password:user.password});
                user.password.length<6 ? setstateFormErr({...stateFormErr, passwordErr:'Password be at least 6 characters'}):setstateFormErr({...stateFormErr, passwordErr:''})   
                if(stateForm.rePass) (stateForm.rePass != user.password) ? setstateFormErr({...stateFormErr, rePassErr:'Passwords do not match!'}):setstateFormErr({...stateFormErr, rePassErr:''})         
                break;
            case 'confirm_password':
                setstateForm({...stateForm, rePass:user.confirm_password});
                (stateForm.password != user.confirm_password) ? setstateFormErr({...stateFormErr, rePassErr:'Passwords do not match!'}):setstateFormErr({...stateFormErr, rePassErr:''})  
                break;
        
            default:
                break;
        }
        // console.log(stateForm.password + ' va ' + stateForm.rePass)
    }
    return isDone ? (
      <div>
        <Redirect to="./login" />
      </div>
    ) : (
      <div className="sign-up-cointainer">
        <div className="signup-form">
          <form>
            <h2>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>
            {stateError && (
              <div className="alert alert-danger">
                <span>{stateError}</span>
              </div>
            )}
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    height: "1.5rem",
                  }}
                >
                  <small className="text-danger">
                    {stateFormErr.userNameErr}
                  </small>
                </div>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fa fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  // className="form-control"
                  name="username"
                  placeholder="Username"
                  required="required"
                  onChange={(e) => {
                    handleChange(e, "username");
                  }}
                  className={classnames("form-control", {
                    "is-invalid": stateFormErr.userNameErr,
                    "is-valid":
                      !stateFormErr.userNameErr && stateForm.userName != "",
                  })}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    height: "1.5rem",
                  }}
                ></div>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fa fa-birthday-cake" />
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  placeholder="Date of birth"
                  required="required"
                  onChange={(e) => {
                    handleChange(e, "dob");
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    height: "1.5rem",
                  }}
                >
                  <small className="text-danger">{stateFormErr.emailErr}</small>
                </div>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-paper-plane" />
                  </span>
                </div>
                <input
                  type="email"
                  // className="form-control"
                  name="email"
                  placeholder="Email Address"
                  required="required"
                  onChange={(e) => {
                    handleChange(e, "email");
                  }}
                  className={classnames("form-control", {
                    "is-invalid": stateFormErr.emailErr,
                    "is-valid": stateForm.email != "",
                  })}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    height: "1.5rem",
                  }}
                >
                  <small className="text-danger">
                    {stateFormErr.passwordErr}
                  </small>
                </div>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  // className="form-control"
                  name="password"
                  placeholder="Password"
                  required="required"
                  onChange={(e) => {
                    handleChange(e, "password");
                  }}
                  className={classnames("form-control", {
                    "is-invalid": stateFormErr.passwordErr,
                    "is-valid":
                      !stateFormErr.passwordErr && stateForm.password.length,
                  })}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div
                  style={{
                    width: "100%",
                    marginLeft: "50px",
                    height: "1.5rem",
                  }}
                >
                  <small className="text-danger">
                    {stateFormErr.rePassErr}
                  </small>
                </div>
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                    <i className="fa fa-check" />
                  </span>
                </div>
                <input
                  type="password"
                  // className="form-control"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required="required"
                  onChange={(e) => {
                    handleChange(e, "confirm_password");
                  }}
                  className={classnames("form-control", {
                    "is-invalid": stateFormErr.rePassErr,
                    "is-valid":
                      !stateFormErr.rePassErr && stateForm.rePass.length,
                  })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-check-label">
                <input type="checkbox" required="required" /> I accept the{" "}
                <a href="#">Terms of Use</a> &amp;{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            Already have an account?
            <Link onClick={() => props.setToggle()}>Log in</Link>
          </div>
        </div>
      </div>
    );
}

export default SignUp;
