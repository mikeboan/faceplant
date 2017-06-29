class Post < ApplicationRecord
  belongs_to :author,
    foreign_key: :poster_id,
    class_name: "User"

  belongs_to :recipient,
    foreign_key: :postee_id,
    class_name: "User"
end
