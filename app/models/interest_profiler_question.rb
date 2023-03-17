class InterestProfilerQuestion < ApplicationRecord
    def index
        render json: InterestProfilerQuestion.all, status: :ok
    end
end
