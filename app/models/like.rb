class Like < ApplicationRecord
  belongs_to :liker, class_name: "User", foreign_key: :liker_id
  belongs_to :likeable, polymorphic: true
end
