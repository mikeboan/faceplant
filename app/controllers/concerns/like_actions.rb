module LikeActions
  def destroy_like
    @like = Like.find_by(
      likeable_id: params["#{controller_name.classify.downcase}_id"],
      likeable_type: controller_name.classify,
      liker_id: current_user.id
    )
    
    if @like
      @like.destroy
      render 'api/likes/show'
    else
      render json: ["No such like"]
    end
  end
end
