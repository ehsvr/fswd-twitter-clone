json.tweets do
  json.array! @tweets do |tweet|
    json.id tweet.id
    json.username tweet.user&.username || "Unknown User" # Avoid undefined errors
    json.message tweet.message
    json.image url_for(tweet.image) if tweet.image.attached?
  end
end
