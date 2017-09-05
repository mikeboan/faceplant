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
  validate :one_request_per_pair, on: :create

  enum status: STATUSES

  belongs_to :friendee,
    foreign_key: :friendee_id,
    class_name: "User"

  belongs_to :friender,
    foreign_key: :friender_id,
    class_name: "User"

  def self.find_by_user_ids(id1, id2)
    self.where(friender_id: id1, friendee_id: id2).or(
      self.where(friendee_id: id1, friender_id: id2)
    ).first
  end

  def accept
    update(status: 1)
  end

  def reject
    update(status: 2)
  end

  private

  def one_request_per_pair
    if self.class.find_by_user_ids(friender_id, friendee_id)
      errors.add(:friendship, "friendship already exists")
    end
  end
end
