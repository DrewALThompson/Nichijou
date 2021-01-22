class ApplicationController < ActionController::API
    protect_from_forgery with: exception
    helper_method :current_user, :require_login

    def current_user

    end

end
