import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors } from "@utils/fetchHelper";
import { useNavigate } from "@src/navigation"; // Custom navigation hook since react-router-dom is not used
import "./profile.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTweet, setNewTweet] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/authenticated", { credentials: "include" })
      .then(handleErrors)
      .then((data) => {
        if (data.authenticated) {
          setUser(data);
          fetchUserTweets(data.username);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const fetchUserTweets = (username) => {
    fetch(`/api/users/${username}/tweets`)
      .then(handleErrors)
      .then((data) => {
        setTweets(data.tweets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

    fetch("/api/logout", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/login";
        } else {
          console.error("Logout failed:", data.error);
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  };

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
            created_at: new Date().toISOString(), // ✅ Use current timestamp
          },
          ...tweets,
        ]);
        setNewTweet("");
      })
      .catch((error) => console.error("Error posting tweet:", error));
  };
  

  const handleDeleteTweet = (tweetId) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

    fetch(`/api/tweets/${tweetId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    })
      .then(handleErrors)
      .then(() => {
        setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
      })
      .catch((error) => console.error("Error deleting tweet:", error));
  };

  const handleUsernameClick = (username) => {
    navigate(`/${username}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="profile-container">
        <h1>User Profile</h1>
        {user ? (
          <div className="user-info">
            <p><strong>Username:</strong> {user.username}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>User not found.</p>
        )}

        {/* Tweet Box */}
        <div className="tweet-box">
          <textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <button className="tweet-button" onClick={handleTweetSubmit}>Tweet</button>
        </div>

        {/* Tweets Section */}
        <h2>Tweets</h2>
        <div className="tweets-list">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card">
                <p className="tweet-user" onClick={() => handleUsernameClick(tweet.username)}>
                  @{tweet.username}
                </p>
                <p className="tweet-content">{tweet.message}</p>
                <p className="tweet-timestamp">
                  {new Date(tweet.created_at).toLocaleString()}
                </p>
                <div className="tweet-actions">
                  {user.username === tweet.username && (
                    <button className="delete-button" onClick={() => handleDeleteTweet(tweet.id)}>
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No tweets found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
