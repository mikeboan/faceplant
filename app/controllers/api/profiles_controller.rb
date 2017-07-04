class Api::ProfilesController < ApplicationController

  def show
    @profile = Profile.includes(user: :profile_pic)
      .includes(:cover_photo)
      .includes(:user)
      .find_by(user_id: params[:user_id])

    if @profile
      render :show
    else
      render @profile.errors.messages, status: 422
    end
  end

end
