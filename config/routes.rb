Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]

    resources :profiles, only: [:show], param: :user_id do
      resources :posts, only: [:create]
    end

    resources :posts, only: [:index, :show, :update, :destroy]
    resources :comments, only: [:create, :destroy, :index, :update]
    resources :likes, only: [:create]

    # destroy likes
    likeable_types = [:comments, :posts]

    likeable_types.each do |type|
      delete "#{type}/:#{type.to_s.singularize}_id/likes",
        to: "#{type}#destroy_like"
    end

    # friendships
    post "users/:id/friendships", to: "users#create_friendship"
    patch "users/:id/friendships", to: "users#update_friendship"
    delete "users/:id/friendships", to: "users#destroy_friendship"
  end
end
