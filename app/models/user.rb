# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  profile_pic_id  :integer
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
	after_create :setup!

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

	belongs_to :profile_pic,
		foreign_key: :profile_pic_id,
		class_name: "Photo",
		optional: true

  has_many :comments, foreign_key: :author_id, class_name: "Comment"

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
	# NEWSFEED
	####################

	def newsfeed_posts
    inclusions = [
      # TODO!
      :user
    ]

		Post.includes(*inclusions).where(user_id: id).or(
			Post.includes(*inclusions).where(profile_id: Profile.where(user_id: id))
		).or(
			Post.includes(*inclusions).where(user_id: friends)
		).or(
			Post.includes(*inclusions).where(profile_id: Profile.where(user_id: friends))
		)
	end

	####################
	# CALLBACKS
	####################

	def setup!
		@profile = Profile.create!(user_id: id)
		create_profile_pic!
		create_cover_photo!
	end

	def create_profile_pic!
		profile_pic = Photo.new
		profile_pic.image = open(Photo::DEFAULT_PROFILE_PIC_URL)
		profile_pic.save!
		self.update(profile_pic: profile_pic)
	end

	def create_cover_photo!
		cover_photo = Photo.new
		cover_photo.image = open(Photo::DEFAULT_COVER_PHOTO_URL)
		cover_photo.save!
		@profile.update(cover_photo: cover_photo)
	end

	####################
	# QUALITY OF LIFE
	####################

  def name
    "#{first_name} #{last_name}"
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
