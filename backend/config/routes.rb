Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/login",    to: "auth#login"
      post "auth/register", to: "auth#register"
      get  "auth/me",       to: "auth#me"

      resources :boards do
        resources :lists, only: [:index, :create, :update, :destroy] do
          resources :cards, only: [:index, :create, :update, :destroy]
        end
      end

      resources :cards, only: [:show, :update] do
        resources :checklist_items, only: [:create, :update, :destroy]
        member do
          patch :move
        end
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
