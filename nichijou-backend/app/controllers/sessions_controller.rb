class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: user
        elsif user && !user.authenticate(params[:password])
            render json: {message: 'Password Incorrect'}
        else
            render json: {message: "User not found."}
        end
    end
end
