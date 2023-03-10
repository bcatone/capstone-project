class InterestProfilerQuestionsController < ApplicationController

    def index
        render json: InterestProfilerQuestion.all, status: :ok
    end
end
