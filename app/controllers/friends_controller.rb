class FriendsController < ApplicationController

    def index
        friendsArr = []
        user = User.find(params[:user_id])

        friends = user.friends
        friends.each do |friend|
            friendsArr << friend
        end

        friendships = Friendship.where(friend: self)
        friendships.each do |friendship|
            friendsArr << friendship.user
        end

        render json: friendsArr, status: :ok
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
