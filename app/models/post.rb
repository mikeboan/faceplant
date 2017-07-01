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
  belongs_to :user
  belongs_to :profile

  has_one :profile_user,
    through: :profile,
    source: :user
end
