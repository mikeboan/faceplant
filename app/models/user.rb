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
	# ASSOCIATIONS
	####################

	has_many :created_posts,
		foreign_key: :poster_id,
		class_name: "Post"

	has_many :received_posts,
		foreign_key: :postee_id,
		class_name: "Post"

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
