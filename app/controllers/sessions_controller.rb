class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show
        render json: current_user, serializer: CurrentUserSerializer, status: :ok
    end
    
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else 
            render json:{ errors: "Invalid username or password"}, status: :unauthorized
        end
    end
    
    def destroy
        session.delete :user_id
        session.delete :geolocation
        head :no_content 
    end
end
