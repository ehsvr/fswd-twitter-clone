Rails.application.routes.draw do
  root 'static_pages#home'
  get '/login' => 'static_pages#login'
  get '/signup' => 'static_pages#signup'
  get '/notifications' => 'static_pages#notifications'
  get '/profile' => 'static_pages#profile'
  namespace :api do
    # USERS
    post '/users'                  => 'users#create'
    get  '/users/:username'        => 'users#show'  # Added this to fetch user profile

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end

  get '*path', to: 'static_pages#home', constraints: ->(req) { !req.xhr? && req.format.html? }
end
