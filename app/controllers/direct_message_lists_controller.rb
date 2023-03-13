class DirectMessageListsController < ApplicationController
    wrap_parameters format: []

    def index
        direct_message_lists = DirectMessageList.where(user_1_id: params(:user_id)).or(DirectMessageList.where(user_2_id: params[:id]))
        render json: direct_message_lists, status: :ok
    end

    def show
        render json: DirectMessageList.find(params[:id]), status: :ok
    end

    def create
        render json: DirectMessageList.create!(direct_message_list_params), status: :created
    end

    def update
        direct_message_list = DirectMessageList.find(params[:id])
        direct_message_list.update!
        render json: direct_message_list, status: :accepted
    end

    def destroy
        direct_message_list.find(params[:id])
        direct_message_list.destroy!
        head :no_content
    end

    private

    def direct_message_list_params
        params.permit(:sender_id, :receiver_id, :is_read?)
    end
end
