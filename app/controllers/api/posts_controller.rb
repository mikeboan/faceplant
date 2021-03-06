class Api::PostsController < ApplicationController
  include LikeActions

  def index
    @posts = current_user.newsfeed_posts
  end

  def show
    # testing purposes only!
    @post = Post.includes(
      :author,
      :likers,
      :likes,
      comments: [
        :author,
        :likes,
        :likers,
      ]
    ).find(params[:id])
  end

  def create
    @post = Post.new(post_params)
    @post.profile = Profile.find_by(user_id: params[:profile_user_id]) if params[:profile_user_id]

    if @post.save
      render :show
    else
      render @post.errors.messages, status: 422
    end
  end

  def update
    @post = Post.includes(comments: :author).find(params[:id])

    if @post.update(post_params)
      render :show
    else
      render @post.errors.messages, status: 422
    end
  end

  def destroy
    @post = Post.includes(comments: :author).find(params[:id])

    if @post.destroy
      render :show
    else
      render @post.errors.messages, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:body, :author_id)
  end

end
