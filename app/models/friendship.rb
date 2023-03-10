class Friendship < ApplicationRecord
  has_many :direct_message_lists, dependent: :destroy
  belongs_to :user
  belongs_to :friend, class_name: :User

  validates :user, uniqueness: { scope: :friend }
  validates :friend, uniqueness: { scope: :user }

end
