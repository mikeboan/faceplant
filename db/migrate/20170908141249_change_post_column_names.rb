class ChangePostColumnNames < ActiveRecord::Migration[5.0]
  def change
    rename_column :posts, :user_id, :author_id
    rename_column :posts, :content, :body
  end
end
