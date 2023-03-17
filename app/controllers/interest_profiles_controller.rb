class InterestProfilesController < ApplicationController
    require "./app/OnetWebService"
    # require process.env.REACT_APP_SECRET_USERNAME
    # require process.env.REACT_APP_SECRET_PASSWORD
    
    skip_before_action :authorized_user

    def index
        render json: InterestProfile.all, status: :ok
    end

    def show
        render json: InterestProfile.find(params[:id]), status: :ok
    end

    def create
        answer_string = params[:answer_string]

        onet_ws = OnetWebService.new(ENV["REACT_APP_SECRET_USERNAME"], ENV["REACT_APP_SECRET_PASSWORD"])
        response = onet_ws.call("https://services.onetcenter.org/ws/mnm/interestprofiler/results?answers=#{answer_string}")
        hash = JSON.parse(response.to_json)
        puts hash
        
        realistic = 0
        investigative = 0
        artistic = 0
        social = 0
        enterprising = 0
        conventional = 0

        results = hash["result"]
        puts results
        results.each do |result|
            case result["area"]
            when "Realistic"
                realistic = result["score"]
            when "investigative"
                investigative = result["score"]
            when "artistic"
                artistic = result["score"]
            when "social"
                social = result["score"]
            when "enterprising"
                enterprising = result["score"]
            when "conventional"
                conventional = result["score"]
            else
                puts "Interest Profile attribute not found."
            end
        end
        interest_profile = InterestProfile.create!(answer_string: answer_string, realistic: realistic, investigative: investigative, artistic: artistic, social: social, enterprising: enterprising, conventional: conventional)
        UserInterestProfile.create!(interest_profile: interest_profile, user: params[:user])
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
