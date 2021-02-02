class UsersController < ApplicationController

    def create
        user = User.find_or_create_by(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation])
        render json: user
    end


end
