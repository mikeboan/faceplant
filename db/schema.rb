# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170810171709) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "body"
    t.integer  "author_id"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "parent_id"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id", using: :btree
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "friendee_id", null: false
    t.integer "friender_id", null: false
    t.integer "status",      null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer "liker_id",      null: false
    t.string  "likeable_type", null: false
    t.integer "likeable_id",   null: false
    t.index ["likeable_id"], name: "index_likes_on_likeable_id", using: :btree
    t.index ["liker_id"], name: "index_likes_on_liker_id", using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "content",    null: false
    t.integer  "user_id",    null: false
    t.integer  "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.string  "workplace"
    t.string  "school"
    t.string  "location"
    t.string  "hometown"
    t.string  "relationship_status"
    t.integer "user_id"
    t.string  "work_title"
    t.integer "cover_photo_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                    null: false
    t.string   "first_name",               null: false
    t.string   "last_name",                null: false
    t.string   "password_digest",          null: false
    t.string   "session_token",            null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.string   "cover_photo_file_name"
    t.string   "cover_photo_content_type"
    t.integer  "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
    t.integer  "profile_pic_id"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

end
