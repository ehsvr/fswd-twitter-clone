class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def profile
    render 'profile'
  end

  def feed
    render 'feed'
  end

  def login
    render 'login'
  end

  def signup
    render 'signup'
  end
end
