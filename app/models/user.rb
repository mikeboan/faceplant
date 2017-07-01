# == Schema Information
#
# Table name: users
#
#  id                       :integer          not null, primary key
#  email                    :string           not null
#  first_name               :string           not null
#  last_name                :string           not null
#  password_digest          :string           not null
#  session_token            :string           not null
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  profile_pic_file_name    :string
#  profile_pic_content_type :string
#  profile_pic_file_size    :integer
#  profile_pic_updated_at   :datetime
#  cover_photo_file_name    :string
#  cover_photo_content_type :string
#  cover_photo_file_size    :integer
#  cover_photo_updated_at   :datetime
#

class User < ApplicationRecord
	attr_reader :password

	####################
	# VALIDATIONS
	####################

	validates :email, :first_name, :last_name, :password_digest, :session_token, presence: true
	validates :email, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

	####################
	# PAPERCLIP
	####################

	has_attached_file :profile_pic, default_url: "avatar.jpg"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  has_attached_file :cover_photo, default_url: "cover_photo.png"
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\z/

	####################
	# SINGLE ASSOCIATIONS
	####################

	has_one :profile
	has_many :posts,
		foreign_key: :user_id,
		class_name: "Post"

  has_many :sent_friend_requests,
    foreign_key: :friender_id,
    class_name: "Friendship"

  has_many :received_friend_requests,
    foreign_key: :friendee_id,
    class_name: "Friendship"


  ####################
	# THROUGH ASSOCIATIONS
	####################

	has_many :profile_posts,
		through: :profile,
		source: :posts

  has_many :requested_friends, # friends this user requested
    through: :sent_friend_requests,
    source: :friendee

  has_many :received_friends, # friends this user agreed to
    through: :received_friend_requests,
    source: :friender

	####################
	# FRIENDS
	####################

  def friendships
    Friendship.where(friendee_id: id).or(
      Friendship.where(friender_id: id)
    )
  end

  def all_friends
    User
      .joins(<<-SQL)
        INNER JOIN
          friendships
        ON friender_id = users.id OR friendee_id = users.id
      SQL
      .where(<<-SQL, id, id, id)
        users.id != ? AND (friender_id = ? OR friendee_id = ?)
      SQL
  end

  Friendship::STATUSES.each_with_index do |status, index|
    define_method("#{status}_friends") do
      all_friends.where("friendships.status = #{index}")
    end
  end

  alias_method :friends, :accepted_friends

  ["sent", "received"].each do |direction|
    Friendship::STATUSES.each do |status|
      define_method("#{direction}_#{status}_friend_requests") do
        send("${direction}_friend_requests").where(status: status)
      end

      define_method("#{direction}_#{status}_friends") do
        send("${direction}_friends").where(status: status)
      end
    end
  end

	####################
	# AUTH
	####################

	def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials email, password
		user = User.find_by(email: email)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is? password
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = new_session_token
		end
	end

end
