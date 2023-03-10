class FriendSuggestionsController < ApplicationController

    def index
        user = User.find(params[:user_id])
        render json: user.suggested_friends, status: :ok
    end
    
end
