class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(username: params[:username], password: params[:password])
        render json: user
    end

    def create
        user = User.find_or_create_by(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation])
        render json: user
    end


end
