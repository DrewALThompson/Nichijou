class UsersController < ApplicationController

    def create
        if params[:password] === params[:password_confirmation]
          if User.find_by(username: params[:username])
            user = User.find_by(username: params[:username])
            if user.authenticate(params[:password])
              render json: user
            else 
              render json: {message: "You done goofed."}
            end
          else
            user = User.new(username: params[:username], password: params[:password], password_confirmation: params[:password_confirmation])
            user.save
            render json: user
          end
        end
    end


end
