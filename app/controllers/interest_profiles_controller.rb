class InterestProfilesController < ApplicationController
    require "./app/OnetWebService"

    def index
        render json: InterestProfile.all, status: :ok
    end

    def show
        render json: InterestProfile.find(params[:id]), status: :ok
    end

    def create
        answer_string = params(:answer_string)

        response = onet_ws.call("https://services.onetcenter.org/ws/mnm/interestprofiler/results?answers=#{answer_string}")
        hash = JSON.parse(response.to_json)

        results = hash["result"]
        @scores = []
        results.each do |result|
            score = result["score"]
            @scores << score
        end
        
        interest_profile = InterestProfile.create!(realistic: score[0], 
        investigative: score[1], artistic: score[2], social: score[3], enterprising: score[4], 
        conventional: score[5])
        render json: interest_profile, status: :created
    end

    def update
        interest_profile = InterestProfile.find(params[:id])
        render json: interest_profile.update!(interest_profile_params)
    end

    private

    def interest_profile_params
        params.permit(:answer_string, :realistic, :investigative, :artistic, :social, :enterprising, :conventional)
    end
end
