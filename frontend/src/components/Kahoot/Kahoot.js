import React, { useEffect, useState } from "react";
import "../search.css";
import { db, storage } from "../../firebase";
import imgDefault from "../../assets/kahoot.png";
import Headers from "../Header.jsx";
import { Link } from "react-router-dom";
import "./Kahoot.css";
function Kahoot(props) {
  const [dataKahoot, setdataKahoot] = useState([]);
  const [toogle, setToogle] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("kahoot_2").get();
      setdataKahoot(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, [toogle]);

  async function handleDelete(id) {
    await db.collection("kahoot_2").doc(id).delete();
    setToogle(!toogle);
  }

  

  return (
    <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <Headers />
      <div style={{ padding: "0 20%", backgroundColor: "rgb(242, 242, 242)" }}>
        <div>
          <div
            className="search-home"
            style={{ width: "80%", margin: "0 auto", marginTop: "3%" }}
          >
            <div className="searchbar" style={{ marginTop: "0" }}>
              <input
                className="search_input"
                type="text"
                name=""
                placeholder="Search..."
              ></input>
              <a href="#" className="search_icon">
                <i className="fas fa-search"></i>
              </a>
            </div>
          </div>
        </div>
        <h3 style={{ textAlign: "center", margin: "4%" }}>My Kahoot</h3>

        <div className="list-my-kahoot" style={{ height: "71vh" }}>
          <ul>
            {dataKahoot.map((data) => (
              <li key={data.id}>
                <div className="infor-my-kahoot">
                  <div className="box-left d-flex">
                    <img
                      src={data.urlImgQuiz ? data.urlImgQuiz : imgDefault}
                    ></img>
                    <p>
                      {data.listQuestion.length} {" Question"}
                    </p>
                  </div>
                  <div className="box-right">
                    <div>
                      <h4 className="text-center">{data.title.slice(0,12)}</h4>
                      <p onClick={() => handleDelete(data.id)}>delete</p>
                    </div>
                    <div className="lst-btn">
                      <Link
                        to={{
                          pathname: `/game/${data.id}`,
                          data: { id: data.id },
                        }}
                        className="kahoots-play-text"
                      >
                        <button className="btn btn-success">Play</button>
                      </Link>

                      <Link
                        to={{
                          pathname: `/Edit/${data.id}`,
                          data: { id: data.id },
                        }}
                        className="kahoots-play-text"
                      >
                        <button className="btn btn-primary">Edit</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Kahoot;
