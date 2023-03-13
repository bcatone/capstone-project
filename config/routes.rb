Rails.application.routes.draw do
  resources :direct_messages
  resources :direct_message_lists
  root to: 'messages#root'
  mount ActionCable.server => '/cable'
  resources :user_career_matches
  resources :careers
  resources :job_titles
  resources :industries
  resources :profiles
  # resources :user_interest_profiles
  resources :interest_profiles
  resources :friend_requests, only: [:index, :create, :destroy]
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:index, :show, :create, :update, :destroy]

  resources :comments
  resources :tags
  resources :user_posts
  
  resources :user_projects
  resources :teams
  resources :messages
  resources :memberships
  resources :interest_profiler_questions, only: [:index]
  
  
  resources :friendships, only: [:show, :create, :update, :destroy]
  resources :projects, only: [:index, :show, :create, :update, :destroy]
  resources :cities, only: [:index, :show]
  resources :states, only: [:index, :show]
  resources :countries, only: [:index, :show]
  resources :timezones, only: [:index, :show]
  resources :currencies, only: [:index, :show]
  resources :subregions, only: [:index, :show]
  resources :regions, only: [:index, :show]
  
  # auth routes
  post '/login', to: 'sessions#create'
  delete '/logout', to:'sessions#destroy'
  get '/me', to: 'sessions#show'
  post '/signup', to: 'users#create'
  delete '/cancel', to: 'users#destroy'

  # custom routes
  get '/users/:user_id/friend_suggestions', to: 'friend_suggestions#index'
  get '/users/:user_id/friend_requests', to: 'friend_requests#index'
  get '/users/:user_id/friendships', to: 'friendships#index'
  get '/users/:user_id/friends', to: 'friends#index'
  delete '/users/:user_id/friends/:friend_id', to: 'friends#destroy'
  # get '/users/:user_id/direct_messages_lists', to: 'direct_message_lists#index'
  get '/users/:user_id/direct_message_lists', to: 'direct_message_lists#index'
  get '/countries/:country_id/states/:state_id', to: 'states#show'
  get '/direct_message_lists/:direct_message_list_id/', to: 'direct_message_lists#show'

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
