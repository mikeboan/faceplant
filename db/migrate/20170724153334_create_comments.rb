class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string  :body
      t.integer :author_id
      t.integer :commentable_id
      t.string  :commentable_type
      t.timestamps
    end

    add_index :comments, [:commentable_type, :commentable_id]
  end
end
