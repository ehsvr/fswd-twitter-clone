json.tweet do
    json.message @tweet.message
    json.user_id     @tweet.user_id
    json.timestamps  @tweet.timestamps
    
    if tweet.image.attached?
        json.image url_for(tweet.image)
    else
      json.image nil
    end
end