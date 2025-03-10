class Tweet < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_one_attached :image

  after_initialize :set_defaults

  validates :message, presence: true, length: { maximum: 280 }

  private

  def set_defaults
    self.likes_count ||= 0
  end
end
