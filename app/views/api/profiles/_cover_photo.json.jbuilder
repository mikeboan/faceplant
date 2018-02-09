json.coverPhotoUrl profile.cover_photo ?
  profile.cover_photo.url(:cover) :
  Photo::DEFAULT_COVER_PHOTO_URL
