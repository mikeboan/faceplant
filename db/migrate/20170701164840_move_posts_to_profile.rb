class MovePostsToProfile < ActiveRecord::Migration[5.0]
  def change
    rename_column :posts, :postee_id, :profile_id
    change_column :posts, :profile_id, :integer, null: false
  end
end
