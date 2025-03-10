module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(email: params[:user][:email]) # Use email for login

      if @user&.authenticate(params[:user][:password]) # authenticate checks password
        session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: session.token,
          httponly: true
        }

        render 'api/sessions/create'
      else
        render json: { success: false, error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def authenticated
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated'
      else
        render json: { authenticated: false, username: nil }, status: :unauthorized
      end
    end    

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        session.destroy
        cookies.delete(:twitter_session_token)
        render json: { success: true }
      else
        render json: { success: false, error: "Session not found" }, status: :unprocessable_entity
      end
    end
  end
end
