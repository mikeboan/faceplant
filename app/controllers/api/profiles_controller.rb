class Api::ProfilesController < ApplicationController

  def show
    @profile = Profile.includes(user: :profile_pic)
      .includes(:cover_photo)
      .includes(:user)
      .find_by(user_id: params[:user_id])

    if @profile
      @timeline_posts = @profile.timeline_posts.order(created_at: "DESC")
      render :show
    else
      render @profile.errors.messages, status: 422
    end
  end

  def update_cover_photo
    @profile = current_user.profile
    @profile.update!(profile_params)
    render 'api/profiles/tiny_show'
  end

  private

  def profile_params
    params.require(:profile).permit(:cover_photo)
  end

end
