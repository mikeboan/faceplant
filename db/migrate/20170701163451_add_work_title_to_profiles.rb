class AddWorkTitleToProfiles < ActiveRecord::Migration[5.0]
  def change
    rename_column :profiles, :work, :workplace
    add_column :profiles, :work_title, :string
  end
end
