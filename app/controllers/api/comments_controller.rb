class Api::CommentsController < ApplicationController
  include LikeActions
  
  def create
    @comment = Comment.new(comment_params)
    @comment.commentable_id = params[:post_id]
    @comment.author = current_user

    if @comment.save
      render :show
    else
      render json: @comment.errors
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commentable_type)
  end
end
