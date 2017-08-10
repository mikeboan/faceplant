class Api::CommentsController < ApplicationController
  include LikeActions

  def index
    @comments = Comment.all
      # .includes()
  end

  def show
    @comment = Comment.find(params[:id])
      # .includes()

    if @comment
      render :show
    else
      render json: ["no such comment"]
    end
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author = current_user

    if @comment.save
      render :show
    else
      render json: @comment.errors
    end
  end

  private

  def comment_params
    params
      .require(:comment)
      .permit(:body, :commentable_type, :commentable_id, :parent_id)
  end
end
