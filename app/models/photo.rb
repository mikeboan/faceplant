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
  DEFAULT_PROFILE_PIC_URL = "https://s3-us-west-2.amazonaws.com/faceplant-seeds/avatar.jpg"
  DEFAULT_COVER_PHOTO_URL = "https://s3-us-west-2.amazonaws.com/faceplant-seeds/cover_photo.jpg"

  has_attached_file :image,
    styles: { avatar: "168x168>", thumb: "38x38>", cover: "848x315" },
    default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_one :user,
    foreign_key: :profile_pic_id,
    class_name: "User"

  has_one :profile,
    foreign_key: :cover_photo_id,
    class_name: "Profile"

  def url(style = nil)
    image.url(style)
  end
end
