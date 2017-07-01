class ChangePostsUserForeignKey < ActiveRecord::Migration[5.0]
  def change
    rename_column :posts, :poster_id, :user_id
  end
end
