class FriendsController < ApplicationController

    def index
        user = User.find(params[:user_id])
        render json: user.connected_friends, status: :ok
    end

    def destroy
        friendship = Friendship.find_by(user_id: params[:user_id], friend_id: params[:friend_id])
        if friendship
            friendship.destroy!
            head :no_content
        else
            friendship = Friendship.find_by!(user_id: params[:friend_id],friend_id: params[:user_id])
            friendship.destroy!
            head :no_content
        end
    end

end
