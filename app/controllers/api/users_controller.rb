class Api::UsersController < ApplicationController
  def index
    @users = User.search_by_name(params[:query])

    if @users
      render 'api/users/search'
    else
      render json: { search: ['No results found'] }
    end
  end

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

  def update
    @user = current_user
    @user.update!(user_params)
    render 'api/users/tiny_show'
  end

  ###############
  # FRIENDSHIPS #
  ###############

  def create_friendship
    friendship = User.find(params[:id]).new_friend_request(current_user)

    if friendship.save
      render json: friendship
    else
      render json: friendship.errors
    end
  end

  def update_friendship
    friendship = Friendship.find_by_user_ids(params[:id], current_user.id)

    if friendship.update(friendship_params)
      render json: friendship
    else
      render json: friendship.errors
    end
  end

  def destroy_friendship
    friendship = Friendship.find_by_user_ids(params[:id], current_user.id)

    if friendship.destroy
      render json: friendship
    else
      render json: frienship.errors
    end
  end

	private

	def user_params
		params.require(:user).permit(
      :email,
      :first_name,
      :last_name,
      :password,
      :profile_pic
    )
	end

  def friendship_params
    params.require(:friendship).permit(:status)
  end
end
