Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]

    resources :profiles, only: [:show], param: :user_id do
      resources :posts, only: [:create]
    end

    resources :posts, only: [:update, :destroy] do
      resources :comments, only: [:create]
    end

    resources :likes, only: [:create]

    # destroy likes
    likeable_types = [:comments, :posts]

    likeable_types.each do |type|
      delete "#{type}/:#{type.to_s.singularize}_id/likes",
        to: "#{type}#destroy_like"
    end
  end
end
