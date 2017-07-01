class RemoveImageableColumnsFromPictures < ActiveRecord::Migration[5.0]
  def change
    remove_column :pictures, :imageable_type, :string
    remove_column :pictures, :imageable_id, :integer
  end
end
