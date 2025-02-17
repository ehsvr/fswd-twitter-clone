import React from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { handleErrors } from "@utils/fetchHelper";

import "./home.scss";

const Home = () => {
  return (
    <Layout>
      <div className="home-feed">
        <h2>Home</h2>
        <div className="tweet-box">
          <textarea placeholder="What's happening?" />
          <button>Tweet</button>
        </div>
        <div className="tweets">
          <div className="tweet">
            <p><strong>@user1</strong>: This is a sample tweet!</p>
          </div>
          <div className="tweet">
            <p><strong>@user2</strong>: Another tweet example.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});

export default Home;
