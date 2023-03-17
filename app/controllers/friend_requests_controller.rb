class FriendRequestsController < ApplicationController
    skip_before_action :authorized_user
    wrap_parameters format: []

    def index
        friend_requests = FriendRequest.where(receiver_id: params[:user_id])
        users = []
        friend_requests.each do |friend_request|
            users << friend_request.sender
        end
        render json: users, status: :ok
    end

    def create
        render json: FriendRequest.create!(friend_request_params), status: :created
    end

    def destroy
        friend_request = FriendRequest.find(params[:id])
        friend_request.destroy!
        head :no_content
    end

    private

    def friend_request_params
        params.permit(:sender_id, :receiver_id)
    end

end
