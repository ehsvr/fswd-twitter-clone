class User < ApplicationRecord
  has_secure_password
  
  has_many :sessions
  has_many :tweets
  has_many :likes
  has_many :follows_as_follower, class_name: "Follow", foreign_key: "follower_id"
  has_many :follows_as_followed, class_name: "Follow", foreign_key: "followed_id"
  has_many :followers, through: :follows_as_followed, source: :follower
  has_many :following, through: :follows_as_follower, source: :followed

  validates :username, presence: true, length: { minimum: 3, maximum: 64 }, uniqueness: true
  validates :email, presence: true, length: { minimum: 5, maximum: 500 }, uniqueness: true
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }
end
