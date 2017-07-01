# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  content    :string           not null
#  poster_id  :integer          not null
#  postee_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
  belongs_to :author,
    foreign_key: :poster_id,
    class_name: "User"

  # belongs_to :recipient,
  #   foreign_key: :postee_id,
  #   class_name: "User"
end
