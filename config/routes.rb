Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]

    resources :profiles, only: [:show], param: :user_id do
      resources :posts, only: [:create]
    end

    resources :posts, only: [:update, :destroy]
  end

end
