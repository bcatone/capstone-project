class UserProjectsController < ApplicationController

    def index
        render json: UserProject.all, status: :ok
    end

    def show
        render json: UserProject.find(params[:id]), status: :ok
    end
    
    def create
        user_project = UserProject.create!(user_project_params)
        render json: user_project.project, status: :created
    end

    def update
        user_project = UserProject.find(params[:id])
        user_project.update!
        render json: user_project, status: :accepted
    end

    def destroy
        user_project = UserProject.find(params[:id])
        user_project.destroy!
        head :no_content
    end
end
