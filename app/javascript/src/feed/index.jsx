import React from "react";
import ReactDOM from "react-dom";
import Feed from "./feed";
import "./feed.scss";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("feed-container");
  if (container) {
    ReactDOM.render(<Feed />, container);
  }
});