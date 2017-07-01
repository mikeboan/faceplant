class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :work
      t.string :school
      t.string :location
      t.string :hometown
      t.string :relationship_status
      t.integer :user_id
    end
  end
end
