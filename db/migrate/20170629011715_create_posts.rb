class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :content, null: false
      t.integer :poster_id, null: false
      t.integer :postee_id

      t.timestamps
    end
  end
end
