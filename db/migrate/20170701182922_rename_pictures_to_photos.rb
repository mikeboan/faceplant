class RenamePicturesToPhotos < ActiveRecord::Migration[5.0]
  def change
    rename_table :pictures, :photos
  end
end
