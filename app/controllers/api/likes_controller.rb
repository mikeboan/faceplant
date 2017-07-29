class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params.merge(liker: current_user))

    if @like.save
      render :show
    else
      render json: @like.errors.full_messages
    end
  end

  def destroy
    @like = Like.find(params[:id])

    if @like.destroy
      render :show
    else
      render json: @like.errors.full_messages
    end
  end

  private
  def like_params
    params.require(:like).permit(:likeable_type, :likeable_id)
  end
end
