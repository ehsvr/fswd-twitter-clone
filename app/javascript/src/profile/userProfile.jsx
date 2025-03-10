import React, { useState, useEffect } from "react";
import Layout from "@src/layout";
import { handleErrors } from "@utils/fetchHelper";
import { useParams } from "@src/useParams"; // Custom Hook for getting URL parameters
import "./profile.scss";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then(handleErrors)
      .then((data) => {
        setUser(data);
        setTweets(data.tweets);
        setFollowing(data.following);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  const handleFollowToggle = () => {
    fetch(`/api/users/${username}/toggle_follow`, {
      method: "POST",
      credentials: "include"
    })
      .then(handleErrors)
      .then((data) => setFollowing(data.following));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="profile-container">
        <h1>@{user.username}</h1>
        <button onClick={handleFollowToggle}>
          {following ? "Unfollow" : "Follow"}
        </button>

        <h2>Tweets</h2>
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <p>{tweet.message}</p>
              <p className="tweet-time">{new Date(tweet.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No tweets found.</p>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
