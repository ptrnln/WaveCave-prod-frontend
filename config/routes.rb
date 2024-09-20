Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # namespace :api, defaults: { format: :json } do
  defaults format: :json do
    get "users/:username/tracks/:title" => "tracks#show", title: /[^\/]+/
    get "users/@:username" => "users#show", username: /[^\/]+/
    resources :users, only: [ :index, :create, :show  ]
    resource :session, only: [ :show, :create, :destroy ]
    resources :tracks
    resources :playlists
    resources :playlist_tracks, only: [ :index, :show, :create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"
end
