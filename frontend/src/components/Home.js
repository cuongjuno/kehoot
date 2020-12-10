import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import logo from "../assets/kahoot.png";
import "./Home.css";
import fake from "../assets/fake2.jpg";
import Header from "./Header.jsx";
import { db } from "../firebase";

function Home(props) {
  const [dataKahoot, setdataKahoot] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("kahoot_2").get();
      setdataKahoot(data.docs.map((doc) => doc.data()).slice(0, 3));
    };
    fetchData();
  }, []);
  useEffect(() => {
    {
    }
  }, [dataKahoot]);

  return (
    <>
      <Header />
      <div className="contaier-home row">
        <div className="left-home col-md-4">
          <div className="infor-player">
            <h2>Cường Nguyễn</h2>
            <h3>Juno</h3>
            <div>
              <p>Tuổi: 20</p>
              <p>Trường UET</p>
              <p>Số kahoot: 4</p>
            </div>
          </div>
          <div className="last-report">
            <h2>Last reports</h2>
            <div className="infor-report">
              <div className="detail-report">
                <i className="fas fa-columns fa-2x"></i>
                <div>
                  <p style={{ color: "blue" }}>Done - see result</p>
                  <p>{"Tên kahoot: "}</p>
                </div>
              </div>
              <div className="detail-report">
                <i className="fas fa-columns fa-2x"></i>
                <div>
                  <p style={{ color: "blue" }}>Done - see result</p>
                  <p>Tên kahoot: okee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 big-kahoot">
          <div className="list-kahoot">
            <h2 style={{ marginTop: "4%" }}>My kahoots</h2>
            <div style={{ marginTop: "15%" }}>
              {dataKahoot.map((data) => (
                <Link
                  to={{
                    pathname: `/game/${data.id}`,
                    data: { id: data.id },
                  }}
                  className="kahoots-play-text"
                >
                  <div className="infor-kahoot">
                    <img src={logo} style={{ width: "24%" }}></img>
                    <div style={{ marginLeft: "5%" }}>
                      <h3 style={{ color: "black" }}>
                        {data.title.slice(0.12)}
                      </h3>
                      <p>
                        {data.listQuestion.length} {"qs"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/kahoot">
              <p style={{ textAlign: "center" }}>See all</p>
            </Link>
          </div>
        </div>
        <div className="right-home col-md-4">
          <div className="search-home" style={{ width: "80%" }}>
            <div className="searchbar">
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
          <img src={fake} style={{ width: "80%", marginTop: "35%" }}></img>
        </div>
      </div>
    </>
  );
}

export default Home;
