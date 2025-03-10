import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Layout from "@src/layout";
import { handleErrors } from "@utils/fetchHelper";

import "./home.scss";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch authenticated user
    fetch("/api/authenticated", { credentials: "include" })
      .then(handleErrors)
      .then((data) => {
        if (data.authenticated) {
          setUser(data);
        }
      })
      .catch((error) => console.error("Error fetching user:", error));

    // Fetch tweets
    fetch("/api/home_feed")
      .then(handleErrors)
      .then((data) => {
        console.log("Fetched tweets:", data);
        setTweets(data.tweets || []);
      })
      .catch((error) => console.error("Error loading tweets:", error));
  }, []);

  const handleTweetSubmit = (e) => {
    e.preventDefault();
    if (!newTweet.trim()) return;

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

    fetch("/api/tweets", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ tweet: { message: newTweet } }),
    })
      .then(handleErrors)
      .then((data) => {
        setTweets([
          {
            id: data.tweet.id,
            message: data.tweet.message,
            username: user.username, // ✅ Ensure username is included
            created_at: new Date().toISOString(), // ✅ Fix date issue
          },
          ...tweets,
        ]);
        setNewTweet("");
      })
      .catch((error) => console.error("Error posting tweet:", error));
  };

  return (
    <Layout>
      <div className="home-feed">
        <h2>Home</h2>

        {/* Tweet Box - Only show if user is logged in */}
        {user && (
          <div className="tweet-box">
            <textarea
              placeholder="What's happening?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
            />
            <button onClick={handleTweetSubmit}>Tweet</button>
          </div>
        )}

        {/* Tweets Section */}
        <div className="tweets">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div key={tweet.id} className="tweet">
                <p>
                  <strong 
                    className="clickable-username" 
                    onClick={() => (window.location.href = `/${tweet.username}`)}
                  >
                    @{tweet.username || "Unknown"}
                  </strong>: {tweet.message}
                </p>
                {tweet.image && <img src={tweet.image} alt="Tweet" />}
                <p className="tweet-timestamp">
                  {new Date(tweet.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No tweets available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Mount Component to DOM
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});

export default Home;
