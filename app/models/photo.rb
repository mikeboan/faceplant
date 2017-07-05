# == Schema Information
#
# Table name: photos
#
#  id                 :integer          not null, primary key
#  name               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Photo < ApplicationRecord
  DEFAULT_PROFILE_PIC_URL = "http://s3.amazonaws.com/faceplant-dev/photos/images/000/000/001/original/avatar.jpg?1498936822"
  DEFAULT_COVER_PHOTO_URL = "http://s3.amazonaws.com/faceplant-dev/photos/images/000/000/016/original/cover_photo.jpg?1499275771"

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_one :user,
    foreign_key: :profile_pic_id,
    class_name: "User"

  has_one :profile,
    foreign_key: :cover_photo_id,
    class_name: "Profile"

  def url
    image.url
  end
end
