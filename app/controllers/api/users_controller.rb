module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
    
      if @user.save
        render json: { success: true, user: @user }
      else
        render json: {
          success: false,
          errors: @user.errors.full_messages
        }, status: :unprocessable_entity
      end
    end    
    
    def show
      user = User.find_by(username: params[:id])
      if user
        render json: {
          username: user.username,
          tweets: user.tweets.order(created_at: :desc),
          following: current_user ? current_user.following.exists?(user.id) : false
        }
      else
        render json: { error: "User not found" }, status: :not_found
      end
    end


    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
    
  end
end
