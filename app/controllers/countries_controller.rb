class CountriesController < ApplicationController
    skip_before_action :authorized_user, only: [:index, :show]

    def index
        render json: Country.all, status: :ok
    end

    def show
        render json: Country.find(params[:id]), serializer: CountryWithStatesSerializer, status: :ok
    end

end
