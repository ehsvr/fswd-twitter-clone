class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    before_action :set_csrf_cookie
  
    helper_method :current_user
  
    def current_user
      return @current_user if defined?(@current_user)
  
      token = cookies.signed[:twitter_session_token] # 🔥 Get token from cookies
      session = Session.find_by(token: token) # 🔥 Find session by token
  
      @current_user = session&.user # 🔥 Retrieve user if session exists
    end
  
    def authenticate_user!
      unless current_user
        render json: { error: "You must be logged in" }, status: :unauthorized
      end
    end
  
    private
  
    def set_csrf_cookie
      cookies["CSRF-TOKEN"] = form_authenticity_token
    end
  end
  