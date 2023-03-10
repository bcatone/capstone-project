class FriendshipsController < ApplicationController
    # skip_before_action :authorized_user
    wrap_parameters format: []

    def show
        render json: Friendship.find(params[:id]), status: :ok
    end

    def create
        accepted_request = FriendRequest.find_by(sender: params[:friend_id], receiver: params[:user_id])
        # if !accepted_request
        #     accepted_request = FriendRequest.find_by!(sender: params[:user], receiver: params[:friend])
        # end
        friendship = Friendship.create!(friendship_params)
        accepted_request.destroy!
        render json: friendship, status: :created
    end

    def update
        friendship = Friendship.find(params[:id])
        friendship.update!(friendship_params)
        render json: friendship, status: :accepted
    end

    def destroy
        friendship = Friendship.find(params[:id])
        friendship.destroy!
        head :no_content
    end
    
    private

    def friendship_params
        params.permit(:user_id, :friend_id)
    end

end