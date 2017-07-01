class AddPhotoIdsToProfilesAndUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :profile_pic_id, :integer
    add_column :profiles, :cover_photo_id, :integer
  end
end
