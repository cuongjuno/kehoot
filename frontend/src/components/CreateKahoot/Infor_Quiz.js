import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Infor_Quiz.css";
import { Input } from "@material-ui/core";
import { storage } from "../../firebase";
import { saveImage } from "../../utils/uploadFileToFiirebase";
function InforQuiz(props) {
  const [stateInfor, setStateInfor] = useState({
    title: "",
    description: "",
    urlImgQuiz: "",
  });
  useEffect(() => {
    props.inforCallBack(stateInfor);
  }, [stateInfor.urlImgQuiz])
  function handleSubmit() {
    handleUpload();
    
  }
  const handleUpload = () => {};
  function handleCancel() {}
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
          console.log(downloadURL)
          setStateInfor({ ...stateInfor, urlImgQuiz: downloadURL });
        });
      }
    );
  };
  
  function handleTitle(e) {
    setStateInfor({ ...stateInfor, title: e.target.value });
  }
  function handleDescription(e) {
    setStateInfor({ ...stateInfor, description: e.target.value });
  }
  return (
    <div>
      <h1>Kahoot summary</h1>
      <div className="top-form">
        <div className="left ">
          <label>Title</label>
          <input
            type="text"
            value={stateInfor.title}
            placeholder="Enter kahoot title..."
            onChange={handleTitle}
          ></input>
          <label>Description</label>
          <textarea
            type="text"
            value={stateInfor.description}
            onChange={handleDescription}
          ></textarea>
        </div>
        <div className="right ">
          <label>Cover image</label>
          <div className="load-img">
            <img src={stateInfor.urlImgQuiz} alt="" className="img-fluid"></img>
          </div>
          <span class="btn btn-primary btn-file">
            Upload
            <input type="file" onChange={upload} />
          </span>
        </div>
      </div>

      <div className="button-form">
        <button class="btn btn-secondary" data-dismiss="modal">
          Cancel
        </button>
        <button
          class="btn btn-success"
          data-dismiss="modal"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default InforQuiz;
