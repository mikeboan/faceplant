class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :friendee_id, null: false
      t.integer :friender_id, null: false
      t.integer :status, null: false # 0: pending, 1: accepted, 2: rejected
    end
  end
end
