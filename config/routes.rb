Rails.application.routes.draw do
  root to: 'messages#root'
  mount ActionCable.server => '/cable'

  # Presentation
  resources :cities, only: [:index, :show]
  resources :countries, only: [:index, :show]
  resources :direct_messages
  resources :direct_message_lists
  resources :friend_requests, only: [:index, :create, :destroy]
  resources :friendships, only: [:show, :create, :update, :destroy]
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  resources :projects, only: [:index, :show, :create, :update, :destroy]
  resources :states, only: [:index, :show]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :user_projects

  # auth routes
  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#destroy'
  get '/me', to: 'sessions#show'
  post '/signup', to: 'users#create'
  delete '/cancel', to: 'users#destroy'

  # location routes
  get '/geolocations', to: 'geolocations#index'
  get '/countries/:country_id/states/:state_id', to: 'states#show'

  # friendship connection routes
  get '/users/:user_id/friend_suggestions', to: 'friend_suggestions#index'
  get '/countries/:country_id/states/:state_id', to: 'states#show'

  get '/users/:user_id/friend_requests', to: 'friend_requests#index'
  get '/users/:user_id/friends', to: 'friends#index'
  delete '/users/:user_id/friends/:friend_id', to: 'friends#destroy'

  # message routes
  get '/users/:user_id/inbox_links', to: 'inbox_links#index'
  get '/users/:user_id/direct_message_lists', to: 'direct_message_lists#index'
  get '/direct_message_lists/:direct_message_list_id/', to: 'direct_message_lists#show'

  # project routes
  post 'users/:user_id/projects', to: 'projects#create'

  # For future development
  resources :careers
  resources :comments
  resources :currencies, only: [:index, :show]
  resources :industries
  resources :interest_profiles
  resources :interest_profiler_questions, only: [:index]
  resources :job_titles
  resources :memberships
  resources :messages
  resources :profiles
  resources :regions, only: [:index, :show]
  resources :subregions, only: [:index, :show]
  resources :tags
  resources :teams
  resources :timezones, only: [:index, :show]
  resources :user_career_matches
  resources :user_interest_profiles

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
