class PostsController < ApplicationController
    skip_before_action :authorized_user, only: [:index, :show]

    def index
        render json: Post.all, status: :ok
    end

    def show
        render json: Post.find(params[:id]), status: :ok
    end

    def create
        render json: Post.create!(post_params), status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update!(post_params)
        render json: post, status: :accepted
    end

    def destroy
        post = Post.find(params[:id])
        if (post.user.id == current_user.id)
            post.destroy!
            head :no_content
        else
            render json: { errors: "Not Authorized!" }, status: :unauthorized
        end
    end

    private

    def post_params
        params.require(:post).permit(:title, :content, :user_id)
    end
end
