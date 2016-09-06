Qlgd::Application.routes.draw do
  require 'sidekiq/web'
# ...
  mount Sidekiq::Web, at: '/sidekiq'
  
  devise_for :users
  scope '(tenants/:tenant_id)' do
    
    get "/",to:"dashboard#index"
    get "/monitor",to:"dashboard#index"
    get "/search",to:'dashboard#search'
    get '/active',to:'dashboard#monitor'
    get "calendar",to:"dashboard#calendar"
    get "/lich/:id",to:"dashboard#lich"
    get "/lop/:id",to:"dashboard#lop"
    get "/daotao",to:"dashboard#daotao"
    get "/thanhtra",to:'dashboard#thanhtra'
    get "/khoa",to:'dashboard#truongkhoa'
    get "/sinh_viens/:sinh_vien_id",to:'dashboard#sinh_vien'
    get "/giang_viens/:giang_vien_id",to:'dashboard#giang_vien'
    namespace :truongkhoa do 
      get "/:khoa_id",to:'giang_viens#index'
      get "/lop/:lop_id",to:'lop_mon_hocs#show'
      get "/lop/:lop_id/lichtrinh",to:'lop_mon_hocs#lichtrinh'
      get "/lop/:lop_id/tinhhinh",to:'lop_mon_hocs#tinhhinh'
      post "/update",to:'lop_mon_hocs#update'
    end
    namespace :thanhtra do      
      post "/lich_trinh_giang_days",to:'lich_trinh_giang_days#index'
      post "/lich_trinh_giang_days/dimuon",to:'lich_trinh_giang_days#dimuon'
      post "/lich_trinh_giang_days/vesom",to:'lich_trinh_giang_days#vesom'
      post "/lich_trinh_giang_days/botiet",to:'lich_trinh_giang_days#botiet'
      post "/lich_trinh_giang_days/update",to:'lich_trinh_giang_days#update'
      post "/lich_trinh_giang_days/report",to:'lich_trinh_giang_days#report'
      post "/lich_trinh_giang_days/unreport",to:'lich_trinh_giang_days#unreport'
      post "/lich_trinh_giang_days/remove",to:'lich_trinh_giang_days#remove'
      post "/lich_trinh_giang_days/confirm",to:'lich_trinh_giang_days#confirm'
      post "/lich_trinh_giang_days/restore",to:'lich_trinh_giang_days#restore'
    end
    namespace :daotao do 
      get "/lop_hanh_chinhs",to:'ghep_lop#lop_hanh_chinhs'
      get "/lop_mon_hocs",to:'ghep_lop#lop_mon_hocs'
      get "/sinh_viens",to:'ghep_lop#sinh_viens'

      post "/lop_hanh_chinhs",to:'sinh_viens#lop_hanh_chinhs'
      post "/lop_mon_hocs",to:'sinh_viens#lop_mon_hocs'      
      post "/sinh_viens",to:'sinh_viens#sinh_viens'
      get "/phongtrong/:date",to:'rooms#idle'
      post "/phongtrong",to:'rooms#idle'
      post "/move",to:'sinh_viens#move'
      delete "/lop_mon_hocs",to:'sinh_viens#remove'

      get "/lich_trinh_giang_days",to:'lich_trinh_giang_days#index'
      get "/lich_trinh_giang_days/daduyet",to:'lich_trinh_giang_days#daduyet'
      post "/lich_trinh_giang_days/accept",to:'lich_trinh_giang_days#accept'
      post "/lich_trinh_giang_days/drop",to:'lich_trinh_giang_days#drop'
      post "/lich_trinh_giang_days/check",to:'lich_trinh_giang_days#check'

      get '/lop_mon_hocs/:lop_id/calendars',to:'calendars#index'
      post '/lop_mon_hocs/:lop_id/calendars/delete',to:'calendars#remove'
      post '/lop_mon_hocs/:lop_id/calendars/generate',to:'calendars#generate'
      post '/lop_mon_hocs/:lop_id/calendars/restore',to:'calendars#restore'
      post '/lop_mon_hocs/:lop_id/calendars/add',to:'calendars#create'
      post '/lop_mon_hocs/:lop_id/calendars/destroy',to:'calendars#destroy'

      get '/lops',to:'lop_mon_hocs#index'
      post '/lop_mon_hocs/create',to:'lop_mon_hocs#create'
      post '/lop_mon_hocs/start',to:'lop_mon_hocs#start'
      post '/lop_mon_hocs/remove',to:'lop_mon_hocs#remove'
      post '/lop_mon_hocs/restore',to:'lop_mon_hocs#restore'
      post '/lop_mon_hocs/update',to:'lop_mon_hocs#update'
      
      get '/lop_mon_hocs/:lop_id/assistants',to:'assistants#index'
      post '/lop_mon_hocs/:lop_id/assistants/delete',to:'assistants#delete'
      post '/lop_mon_hocs/:lop_id/assistants/create',to:'assistants#create'
      post '/lop_mon_hocs/:lop_id/assistants/update',to:'assistants#update'

      get '/giang_viens',to:'giang_viens#index'
      post '/mon_hocs/create',to:'mon_hocs#create'

      get '/users',to:'users#index'
    end
    namespace :teacher do 
     
      #get '/',to:'static_pages#home'
      get "lich/:lich_id/attendances",to:"attendances#index"
      post "lich/:lich_id/attendances",to:"attendances#update"
      get "lich/:lich_id/noidung",to:'attendances#getnoidung'
      post "lich/noidung",to:"attendances#noidung"
      post "lich/:lich_id/settinglop",to:"attendances#settinglop"
      
	  
	  post "lop/:id/finish",to:"lop_mon_hocs#finish"

      get "lops",to:"lop_mon_hocs#index"
      get "lop/:lop_id/info",to:"lop_mon_hocs#info"
      get "lop/:id/show",to:"lop_mon_hocs#show"
      post "lop/settinglop",to:"lop_mon_hocs#update"  

      get 'lop/:id/assignments',to:"assignments#index"
      post 'lop/:id/assignments',to:"assignments#create"
      post 'lop/:id/reorder_assignments',to:"assignments#reorder"
      put 'lop/:id/assignments',to:'assignments#update'
      delete 'lop/:id/assignments',to:"assignments#delete"

      post 'lop/:id/assignment_groups',to:"assignment_groups#create"
      delete 'lop/:id/assignment_groups',to:"assignment_groups#delete"
      put 'lop/:id/assignment_groups',to:'assignment_groups#update'  
      post 'lop/:id/reorder_assignment_groups',to:'assignment_groups#reorder'

      get '/lop/:id/group_submissions',to:'group_submissions#index'

      get '/lop/:id/submissions2',to:'submissions#index2'
      get '/lop/:id/submissions',to:'submissions#index'
      post '/lop/:id/submissions/diem_chuyen_can',to:'submissions#diem_chuyen_can'
      post '/lop/:id/submissions',to:'submissions#update'
      post '/lop/:lop_id/submissions2',to:'submissions#update2'

      get "lich/:lich_id/info",to:"lich_trinh_giang_days#info"
      get '/lop/:lop_id/lich_trinh_giang_days',to:'lich_trinh_giang_days#index'
      get '/lop/:lop_id/lich_trinh_giang_days/bosung',to:'lich_trinh_giang_days#index_bosung'
      post '/lop/:lop_id/lich_trinh_giang_days/create_bosung',to:'lich_trinh_giang_days#create_bosung'
      put '/lop/:lop_id/lich_trinh_giang_days/update_bosung',to:'lich_trinh_giang_days#update_bosung'
      delete '/lop/:lop_id/lich_trinh_giang_days/remove_bosung',to:'lich_trinh_giang_days#remove_bosung'
      post '/lop/:lop_id/lich_trinh_giang_days/restore_bosung',to:'lich_trinh_giang_days#restore_bosung'
      post '/lop/:lop_id/lich_trinh_giang_days/nghiday',to:'lich_trinh_giang_days#nghiday'
      post '/lop/:lop_id/lich_trinh_giang_days/unnghiday',to:'lich_trinh_giang_days#unnghiday'
      post '/lop/:lop_id/lich_trinh_giang_days/complete',to:'lich_trinh_giang_days#complete'
      post '/lop/:lop_id/lich_trinh_giang_days/uncomplete',to:'lich_trinh_giang_days#uncomplete'
      post '/lop/:lop_id/lich_trinh_giang_days/accept',to:'lich_trinh_giang_days#accept'
      post '/lop/:lop_id/lich_trinh_giang_days/remove',to:'lich_trinh_giang_days#remove'
      post '/lop/:lop_id/lich_trinh_giang_days/restore',to:'lich_trinh_giang_days#restore'
      post '/lop/:lop_id/lich_trinh_giang_days/update',to:'lich_trinh_giang_days#update'
      post '/lop/:lop_id/lich_trinh_giang_days/capnhat',to:'lich_trinh_giang_days#capnhat'
      get '/lop/:lop_id/lich_trinh_giang_days/content',to:'lich_trinh_giang_days#getcontent'
      post '/lop/:lop_id/lich_trinh_giang_days/content',to:'lich_trinh_giang_days#content'
      get '/lich_trinh_giang_days',to:'lich_trinh_giang_days#home'
      get "/lich_trinh_giang_days/thanhtra",to:'lich_trinh_giang_days#thanhtra'
      post "/lich_trinh_giang_days/thanhtraupdate",to:'lich_trinh_giang_days#thanhtraupdate'
      post "/lich_trinh_giang_days/accept",to:'lich_trinh_giang_days#accept'
      post "/lich_trinh_giang_days/request",to:'lich_trinh_giang_days#request2'
      get '/lich_trinh_giang_days/:lich_id/mobile_content',to:'lich_trinh_giang_days#get_mobile_content'
      post '/lich_trinh_giang_days/mobile_content',to:'lich_trinh_giang_days#mobile_content'
      get '/monitor',to:'lich_trinh_giang_days#monitor'
    end
  end
  #match '*a', :to => 'application#routing'
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'dashboard#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
