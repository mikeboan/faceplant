class Api::LikesController < ApplicationController
  def create

    render json: friendship
  end

  private

  def friendship_params
    params.require(:friendship).permit(:status, :friendee_id, :friender_id)
  end
end
