class ProjectsController < ApplicationController
    skip_before_action :authorized_user, only: [:index]
    wrap_parameters format: []

    def index
        render json: Project.all, status: :ok
    end

    def show
        render json: Project.find(params[:id]), status: :ok
    end

    def create
        project = Project.create!(project_params)

        if !project.image.attached?
            project.image.attach(
                io: File.open('./public/avatars/testavatar.png'),
                filename: 'testavatar.png',
                content_type: 'application/png'
            )
        end

        render json: project, status: :created

    end

    def update
        project = Project.find(params[:id])

        if params[:image]
            project.image.purge
        end

        project.update!(project_params)

        if !project.image.attached?
            project.image.attach(
                io: File.open('./public/avatars/testavatar.png'),
                filename: 'testavatar.png',
                content_type: 'application/png'
            )
        end

        render json: project, status: :accepted
    end

    def destroy
        project = Project.find(params[:id])
        project.destroy!
        head :no_content
    end

    private

    def project_params
        params.permit(:title, :description)
    end
end
