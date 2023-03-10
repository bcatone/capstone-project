class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:show, :create]
    wrap_parameters format: []

    def index
        render json: User.all, status: :ok
    end

    def show
        if (current_user.id == params[:id])
            render json: current_user, serializer: CurrentUserSerializer, status: :ok
        else
            user = User.find(params[:id])
            render json: user, status: :ok
        end
        
    end

    def create
        user = User.create!(user_params)

        if !user.avatar.attached?
            user.avatar.attach(
                io: File.open('./public/avatars/testavatar.png'),
                filename: 'testavatar.png',
                content_type: 'application/png'
            )
        end

        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])

        if params[:avatar]
            user.avatar.purge
        end

        user.update!(user_params)

        if !user.avatar.attached?
            user.avatar.attach(
                io: File.open('./public/avatars/testavatar.png'),
                filename: 'testavatar.png',
                content_type: 'application/png'
            )
        end

        render json: user, status: :accepted
    end

    def destroy
        user = User.find_by(id: params[:id])
        if user&.authenticate(params[:password])
            user.destroy!
            head :no_content
            render json: user, status: :created
        else 
            render json:{ errors: "Invalid username or password"}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :email, :phone_number, :first_name, :middle_name, :last_name, :date_of_birth, :country_id, :state_id, :city_id, :zip_code, :avatar)
    end
end
