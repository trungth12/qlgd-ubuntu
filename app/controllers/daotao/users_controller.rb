class Daotao::UsersController < ApplicationController
	def index
		@users = User.all.map {|u| {:id => u.id, :text => u.username}}
		render json: @users, :root => false
	end
end