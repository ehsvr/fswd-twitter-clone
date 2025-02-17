import React, { useState } from "react";
import "./home.scss";

const Layout = ({ children }) => {
  return (
    <div className="twitter-layout">
      <aside className="sidebar">
        <h1 className="logo">Twitter</h1>
        <nav>
          <ul>
            <li>
                <a href="/">🏠 Home</a>
            </li>
            <li>
                <a href="/feed">My Feed</a>
            </li>
            <li>
                <a href="/profile">👤 Profile</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="feed">
        {children}
      </main>
      <aside className="right-sidebar">
        <h2>Trending</h2>
        <ul>
          <li>#React</li>
          <li>#JavaScript</li>
          <li>#WebDevelopment</li>
        </ul>
      </aside>
    </div>
  );
};

export default Layout;
