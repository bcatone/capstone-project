class StatesController < ApplicationController
    skip_before_action :authorized_user, only: [:show]

    def show
        render json: State.find(params[:id]), status: :ok
    end
end
