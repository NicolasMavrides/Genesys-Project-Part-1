Rails.application.routes.draw do
  mount EpiCas::Engine, at: "/"
  devise_for :users

  match "/403", to: "errors#error_403", via: :all
  match "/404", to: "errors#error_404", via: :all
  match "/422", to: "errors#error_422", via: :all
  match "/500", to: "errors#error_500", via: :all

  get :ie_warning, to: 'errors#ie_warning'
  get :javascript_warning, to: 'errors#javascript_warning'

  root to: 'pages#home'

  controller :pages do
    get :about, path: '/about'
    get :quiz, path: '/quiz'
    get :question, path: '/question'
  end

  controller :metrics do
    post :store_metric
  end

  get 'result', to: 'registrations#new'

  resources :link_clicks, only: :create
  resources :visits, only: :index
  resources :registrations, only: [:new, :create]

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
