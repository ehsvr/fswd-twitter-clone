import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors } from "@utils/fetchHelper";
import { useParams } from "react-router"
import "./profile.scss";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then(handleErrors)
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          fetchUserTweets(data.user.username);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [username]);

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
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>User not found.</p>
        )}

        <h2>Tweets</h2>
        <div className="tweets-list">
          {tweets.length > 0 ? (
            tweets.map((tweet) => (
              <div key={tweet.id} className="tweet-card">
                <p>{tweet.content}</p>
                <p className="timestamp">{new Date(tweet.created_at).toLocaleString()}</p>
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
