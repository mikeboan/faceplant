class Api::UsersController < ApplicationController
	def create
		@user = User.includes(:profile_pic).includes(:newsfeed_posts).new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors.messages, status: 422
		end
	end

  def show
    @user = User.includes(:profile_pic).find(params[:id])

    if @user
      render :show
    else
      render json: { user: ['User not found'] }, status: 422
    end
  end

	private

	def user_params
		params.require(:user).permit(:email, :first_name, :last_name, :password)
	end
end
