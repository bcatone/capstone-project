class DirectMessagesController < ApplicationController

    def index
        render json: DirectMessage.all, status: :ok
    end

    def show
        render json: DirectMessage.find(params[:id]), status: :ok
    end

    def create
        render json: DirectMessage.create!(direct_message_params), status: :ok
    end

    def destroy
        direct_message = DirectMessage.find(params[:id])
        direct_message.destroy!
        head :no_content
    end

    private

    def direct_message_params
        params.require(:direct_message).permit(:direct_message_list_id, :sender_id, :receiver_id, :message, :is_read?)
    end
end
