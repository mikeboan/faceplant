# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  content    :string           not null
#  user_id    :integer          not null
#  profile_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
  include Likeable
  include Commentable

  belongs_to :author, foreign_key: :author_id, class_name: :User
  belongs_to :profile

  has_one :profile_user,
    through: :profile,
    source: :user

  has_many :top_level_comments,
    -> { where(parent_id: nil) },
    as: :commentable,
    class_name: "Comment"

end
