Rails.application.routes.draw do

  root "homes#index"

  resources :homes, only:[:index] do
  	collection do 
  		post :get_contacts
  	end
  end
end
