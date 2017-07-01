# == Schema Information
#
# Table name: profiles
#
#  id                  :integer          not null, primary key
#  workplace           :string
#  school              :string
#  location            :string
#  hometown            :string
#  relationship_status :string
#  user_id             :integer
#  work_title          :string
#

class Profile < ApplicationRecord
  validates :user, presence: true

  belongs_to :user
  has_many :posts

  def timeline_posts
    Post.where(user_id: user.id).or(
      Post.where(id: posts.select(:id))
    )
  end
end
