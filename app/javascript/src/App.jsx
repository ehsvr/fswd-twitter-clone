import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./home";
import Explore from "@src/explore";
import Notifications from "@src/notifications";
import Messages from "@src/messages";
import Profile from "@src/profile";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
