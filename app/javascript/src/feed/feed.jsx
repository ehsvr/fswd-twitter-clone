import React, { useEffect, useState } from "react";
import "./index.scss";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tweets/followed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.tweets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tweets...</p>;

  return (
    <div className="feed-container">
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <div key={tweet.id} className="tweet-card">
            <p><strong>{tweet.user.username}</strong></p>
            <p>{tweet.content}</p>
            <span className="tweet-time">{new Date(tweet.created_at).toLocaleString()}</span>
          </div>
        ))
      ) : (
        <p>No tweets to show. Follow users to see tweets here!</p>
      )}
    </div>
  );
};

export default Feed;