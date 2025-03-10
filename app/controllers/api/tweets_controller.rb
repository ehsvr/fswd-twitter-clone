module Api
  class TweetsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy]

    def index
      @tweets = Tweet.includes(:user).order(created_at: :desc)
      render 'api/tweets/index'
    end

    def home_feed
      @tweets = Tweet.includes(:user).order(likes_count: :desc).limit(20)
      render 'api/tweets/index'
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets.order(created_at: :desc)
        render 'api/tweets/index'
      else
        render json: { success: false, error: "User not found" }, status: :not_found
      end
    end

    def create
      unless current_user
        render json: { error: "User not authenticated" }, status: :unauthorized
        return
      end

      @tweet = current_user.tweets.new(tweet_params)
      if @tweet.save
        render json: { success: true, tweet: @tweet }, status: :created
      else
        render json: { success: false, errors: @tweet.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      tweet = current_user.tweets.find_by(id: params[:id])

      if tweet&.destroy
        render json: { success: true }
      else
        render json: { success: false, error: "Unable to delete tweet" }, status: :unprocessable_entity
      end
    end

    private

    def tweet_params
      params.require(:tweet).permit(:message, :image)
    end
  end
end
