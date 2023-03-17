class GeolocationsController < ApplicationController
    skip_before_action :authorized_user
    def index
        begin
            response = RestClient.get("http://ip-api.com/json/")
        rescue RestClient::NotFound
            puts "No location found."
        else
            hash = JSON.parse(response)
            puts hash
            session[:geolocation] = hash
        end

        geolocation = session[:geolocation]

        puts geolocation

        country_code = geolocation["countryCode"]
        country_id = Country.find_by(isoCode: country_code).id

        state_code = geolocation["region"]
        state_id = State.find_by(country_id: country_id, isoCode: state_code).id

        city = geolocation["city"]
        city_id = City.find_by(state_id: state_id, name: city).id

        all_countries = Country.all
        all_states_in_country = State.where(country_id: country_id)
        all_cities_in_state = City.where(state_id: state_id)

        geolocation = {
            geolocation: geolocation,
            country_id: country_id,
            state_id: state_id,
            city_id: city_id,
            all_countries:all_countries,
            all_states_in_country: all_states_in_country,
            all_cities_in_state: all_cities_in_state
        }
        render json: geolocation, status: :ok
    end
end
