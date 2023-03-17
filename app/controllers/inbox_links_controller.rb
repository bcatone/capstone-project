class InboxLinksController < ApplicationController

    def index
        user = User.find(params[:id])
        inbox_arr = []
        friendships = user.connected_friendships
        friendships.each do |friendship|
            friendship_id = friendship.id
            direct_message_id = DirectMessageList.find_by(friendship_id: friendship_id).id
            if friendship.friend_id === self.id
                user_id = User.find_by(id: friendship.user_id).id
                username = User.find_by(id: friendship.user_id).username
            else
                user_id = User.find_by!(id: friendship.friend_id).id
                username = User.find_by!(id: friendship.friend_id).username
            end
            inbox_arr << {direct_message_id: direct_message_id, friendship_id: friendship_id, user_id: user_id, username: username}
        end
        render json: inbox_arr, status: :ok
    end
end
