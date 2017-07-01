# == Schema Information
#
# Table name: friendships
#
#  id          :integer          not null, primary key
#  friendee_id :integer          not null
#  friender_id :integer          not null
#  status      :integer          not null
#

class Friendship < ApplicationRecord
  STATUSES = [:pending, :accepted, :rejected]

  validates :friendee_id, :friender_id, :status, presence: true
  validates :status,
    numericality: {
      greater_than_or_equal_to: 0,
      less_than_or_equal_to: 2
    }

  enum status: STATUSES

  belongs_to :friendee,
    foreign_key: :friendee_id,
    class_name: "User"

  belongs_to :friender,
    foreign_key: :friender_id,
    class_name: "User"

end
