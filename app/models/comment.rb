class Comment < ApplicationRecord
  include Likeable

  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :commentable, polymorphic: true

  has_many :replies, foreign_key: :parent_id, class_name: "Comment"
  belongs_to :parent, class_name: "Comment", optional: true

  has_many :repliers, through: :replies, source: :author
end
