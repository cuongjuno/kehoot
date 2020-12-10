import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InforQuiz from "./Infor_Quiz";
import ListQues from "./List_Ques";
import NewQues from "./New_Ques";
import logo from "../../assets/logo.svg";
import "./Create.css";
import "./point.css";
import "../Game/Game.css";
import "../btn.css";
import defaultLogo from "../../assets/default-image.png";
import { Link, Redirect } from "react-router-dom";
import triangle from "../../Assests/triangle.svg";
import diamond from "../../Assests/diamond.svg";
import square from "../../Assests/square.svg";
import circle from "../../Assests/circle.svg";
import Mini_Ques from "./Mini_Ques";
import { saveImage } from "../../utils/uploadFileToFiirebase";
import { db, storage } from "../../firebase";
import firebase from "firebase/app";
Main.propTypes = {};

function Main(props) {
  const idKahoot = props.location.data.id;

  async function loadKahoot() {
    console.log("loadKahoot");
    let newData = db.collection("kahoot_2").doc(idKahoot);
    await newData
      .get()
      .then(function (docRef) {
        console.log(docRef.data().listQuestion);
        setListState(docRef.data());
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  useEffect(() => {
    loadKahoot();
  }, []);

  // immutable
  const [isEdit, setisEdit] = useState(false);
  const [currentId, setcurrentId] = useState(null);
  const defaultQuestion = {
    title: "", // nội dung câu hỏi
    time: 20, // thời gian trả lời câu hỏi
    point: 500, // điểm của câu hỏi
    answers: [], // list câu trả lời
    posCorrect: "", // vị trí của câu trả lời đúng
    urlImgQues: defaultLogo,
  };
  const [listState, setListState] = useState({
    title: "", // tiêu đề của bộ câu hỏi
    description: "", // mô tả
    urlImgQuiz: "", // link ảnh đại diện bộ câu hỏi
    listQuestion: [], // list câu hỏi bên trong
    token: localStorage.getItem("token"),
  });
  const [stateQuestion, setstateQuestion] = useState({
    title: "", // nội dung câu hỏi
    time: 20, // thời gian trả lời câu hỏi
    point: 500, // điểm của câu hỏi
    answers: [], // list câu trả lời
    posCorrect: "", // vị trí của câu trả lời đúng
    urlImgQues: defaultLogo,
  });
  const [isClick, setisClick] = useState(false);
  const listAnswerDefault = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  };
  const [listAnswer, setlistAnswer] = useState(listAnswerDefault);

  async function handleDone() {
    let newData = db.collection("kahoot_2").doc(idKahoot);
    await newData
      .set({
        ...listState,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", idKahoot);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  function handleInforCallBack(stateInfor) {
    setListState({
      ...listState,
      title: stateInfor.title,
      description: stateInfor.description,
      urlImgQuiz: stateInfor.urlImgQuiz,
    });
  }
  function handleButtonQues(index) {
    setcurrentId(index);
    setisEdit(true);
  }
  const showListQues = (
    <>
      <div style={{ backgroundColor: "rgb(234, 244, 252)" }}>
        <Mini_Ques
          id="Preview"
          showTitle={stateQuestion.title}
          showTime={stateQuestion.time}
          showPoint={stateQuestion.point}
          showImg={stateQuestion.urlImgstateQuestion}
          posAnswer={stateQuestion.posCorrect}
        />
      </div>
      <div style={{ marginTop: "1%", overflowY: "scroll", height: "49vh" }}>
        {listState.listQuestion.map((ques, index) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setcurrentId(index)}
          >
            <Mini_Ques
              id={index}
              showTitle={ques.title}
              showTime={ques.time}
              showPoint={ques.point}
              showImg={ques.urlImgQues}
              posAnswer={ques.posCorrect}
              currentId={currentId}
            />
          </div>
        ))}
      </div>
    </>
  );
  function updateQues() {
    // setListState((prevState) => ({
    //   ...prevState,
    //   listQuestion: prevState.listQuestion.map((q, index) =>
    //     (index === currentId) ? stateQuestion : q
    //   ),
    // }));
  }
  function handleUpdate() {
    setListState((prevState) => ({
      ...prevState,
      listQuestion: prevState.listQuestion.map((q, index) =>
        index === currentId ? stateQuestion : q
      ),
    }));
  }
  function handleTitle(e) {
    setListState({ ...listState, title: e.target.value });
    console.log("okeeeeeeeee");
  }
  function handleTimeLimit(e) {
    isClick ? setisClick(false) : setisClick(true);
  }
  function handleSetTimeLimit(e) {
    setstateQuestion({ ...stateQuestion, time: e.target.value });
    updateQues();
    setisClick(false);
  }
  function handlePoint(e) {
    setstateQuestion({ ...stateQuestion, point: e.target.value });
    updateQues();
  }

  function handleAnswerCorrect(e) {
    updateQues();
    setstateQuestion({ ...stateQuestion, posCorrect: e.target.value });
  }
  useEffect(() => {
    setstateQuestion({
      ...stateQuestion,
      answers: Object.values(listAnswer),
    });
  }, [listAnswer]);
  function handleAnswer(e) {
    setlistAnswer({ ...listAnswer, [e.target.name]: e.target.value });
    console.log(listAnswer);
  }

  function handleAnswerTitleQues(e) {
    setstateQuestion({ ...stateQuestion, title: e.target.value });
    updateQues();
  }
  function handleAddQuestion(e) {
    updateQues();
    setcurrentId(listState.listQuestion.length);
    setListState((prevState) => ({
      ...prevState,
      listQuestion: [...prevState.listQuestion, stateQuestion],
    }));
    setlistAnswer(listAnswerDefault);
    setstateQuestion(defaultQuestion);
  }
  useEffect(() => {
    console.log(stateQuestion);
    setlistAnswer({
      ...listAnswer,
      answer1: stateQuestion.answers[0],
      answer2: stateQuestion.answers[1],
      answer3: stateQuestion.answers[2],
      answer4: stateQuestion.answers[3],
    });
    setisEdit(false);
  }, [isEdit]);
  function handleEditQuestion(e) {
    setstateQuestion(listState.listQuestion[currentId]);
    setisEdit(true);
  }
  const upload = async (event) => {
    const file = event.target.files[0];
    const metadata = {
      contentType: "image/jpeg, image/png",
    };
    const uploadTask = storage.child("images/" + file.name).put(file, metadata);
    uploadTask.on(
      "state_changed", // or 'state_changed'
      function (snapshot) {
        switch (snapshot.state) {
          case "paused": // or 'paused'
            console.log("Upload is paused");
            break;
          case "running": // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        alert("Error");
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setstateQuestion({ ...stateQuestion, urlImgQues: downloadURL });
        });
      }
    );
  };

  // useEffect(() => {

  //   console.log("dsfsdf")
  // }, [listAnswer])

  return (
    <div>
      <div className="header-create" style={{ height: "56px" }}>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark h-100">
          <Link to="/" className="navbar-brand" style={{ marginLeft: "1%" }}>
            <img src={logo} alt="logo" height="40" />
          </Link>
          <div className="config-kahoot" style={{ marginLeft: "3%" }}>
            <input
              className="title-kahoot"
              value={listState.title}
              placeholder="Enter title kahoot!"
              onChange={handleTitle}
            ></input>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              Settings
            </button>
          </div>
          <div className="ml-auto">
            <Link to="/">
              <button className="btn btn-light">Exit</button>
            </Link>
            <Link to="/kahoot">
              <div className="btn btn-success" onClick={handleDone}>
                Done
              </div>
            </Link>
          </div>
          <div class="modal " id="myModal">
            <div class="modal-dialog" style={{ maxWidth: "50%" }}>
              <div class="modal-content">
                <InforQuiz
                  inforCallBack={handleInforCallBack}
                  defaultValue={listState}
                  upload={upload}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="create">
        <div className="side-bar">
          <div>{showListQues}</div>
          <div className="list-btn" style={{ height: "19vh" }}>
            {/* <button className="add-question" onClick={handleAddQuestion}>
              Add question
            </button> */}
            <button
              className="custom-btn btn-15"
              onClick={handleAddQuestion}
              style={{ marginLeft: "21%" }}
            >
              Add
            </button>
            <button
              className="custom-btn btn-5"
              onClick={handleEditQuestion}
              style={{ marginLeft: "21%" }}
            >
              Edit
            </button>
            <button
              className="custom-btn btn-5"
              onClick={handleUpdate}
              style={{ marginLeft: "21%" }}
            >
              Update
            </button>
          </div>
        </div>
        <div className="main-create">
          <div className="content-ques">
            <textarea
              value={stateQuestion.title}
              placeholder="Type your question"
              onChange={handleAnswerTitleQues}
              className="text-center"
              maxLength="120"
            ></textarea>
          </div>
          <div className="content-center">
            <div className="config w-20">
              <div className="time">
                <label>Time limit</label>
                <button onClick={handleTimeLimit} className="kSeJze">
                  {stateQuestion.time}
                  <br />
                  sec
                </button>
                <ul className="fLttgA" style={{ display: !isClick && "none" }}>
                  <li className="dGjCq" open>
                    <button
                      value="5"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      5
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="10"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      10
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="20"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      20
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="30"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      30
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="60"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      60
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="90"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      90
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="120"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      120
                    </button>
                  </li>
                  <li className="dGjCq" open>
                    <button
                      value="240"
                      className="bCkynk"
                      onClick={handleSetTimeLimit}
                    >
                      240
                    </button>
                  </li>
                </ul>
              </div>
              <div className="point">
                <label>Point</label>
                <select
                  class="browser-default custom-select custom-select-lg mb-3"
                  onChange={handlePoint}
                >
                  <option value="500" selected disabled hidden>
                    500
                  </option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="1500">1500</option>
                </select>
              </div>
            </div>
            <div className="config-image">
              <span class="btn btn-info btn-file" style={{ margin: "auto 0" }}>
                Upload
                <input type="file" onChange={upload} />
              </span>
              <div className="load-image">
                <img
                  src={stateQuestion.urlImgQues}
                  alt=""
                  className="img-fluid"
                ></img>
              </div>
            </div>
            <div className="select-answer row">
              <button
                className="btn btn-danger col-md-5"
                onClick={handleAnswerCorrect}
                value="1"
              >
                {stateQuestion.posCorrect == 1 ? (
                  <i class="fas fa-check-circle"></i>
                ) : (
                  1
                )}
              </button>
              <button
                className="btn btn-primary col-md-5"
                onClick={handleAnswerCorrect}
                value="2"
              >
                {stateQuestion.posCorrect == 2 ? (
                  <i class="fas fa-check-circle"></i>
                ) : (
                  2
                )}
              </button>
              <button
                className="btn btn-warning col-md-5"
                onClick={handleAnswerCorrect}
                value="3"
              >
                {stateQuestion.posCorrect == 3 ? (
                  <i class="fas fa-check-circle"></i>
                ) : (
                  3
                )}
              </button>
              <button
                className="btn btn-success col-md-5"
                onClick={handleAnswerCorrect}
                value="4"
              >
                {stateQuestion.posCorrect == 4 ? (
                  <i class="fas fa-check-circle"></i>
                ) : (
                  4
                )}
              </button>
            </div>
          </div>
          <div className="list-answer row">
            <div className="questions-grid">
              <div className="question q1">
                <div className="shape-container">
                  <img src={triangle} alt="" className="shape-style" />
                </div>
                <textarea
                  type="text"
                  onInput={handleAnswer}
                  name="answer1"
                  value={listAnswer.answer1}
                  placeholder="Add answer 1"
                ></textarea>
              </div>
              <div className="question q2 d-flex">
                <div className="shape-container">
                  <img src={diamond} alt="" className="shape-style" />
                </div>
                <textarea
                  type="text"
                  onInput={handleAnswer}
                  name="answer2"
                  value={listAnswer.answer2}
                  placeholder="Add answer 2"
                ></textarea>
              </div>
              <div className="question q3">
                <div className="shape-container">
                  <img src={square} alt="" className="shape-style" />
                </div>
                <textarea
                  type="text"
                  name="answer3"
                  onInput={handleAnswer}
                  value={listAnswer.answer3}
                  placeholder="Add answer 3"
                ></textarea>
              </div>
              <div className="question q4">
                <div className="shape-container">
                  <img src={circle} alt="" className="shape-style" />
                </div>
                <textarea
                  type="text"
                  name="answer4"
                  onInput={handleAnswer}
                  value={listAnswer.answer4}
                  placeholder="Add answer 4"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <ListQues/> */}
      {/* <NewQues/> */}
    </div>
  );
}

export default Main;
