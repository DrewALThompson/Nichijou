class UsersController < ApplicationController
    def show
        user = User.find(username: params[:username], password: params[:password])
        render json: user
    end
end
