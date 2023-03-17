class Friendship < ApplicationRecord
  has_one :direct_message_list, dependent: :destroy
  belongs_to :user
  belongs_to :friend, class_name: :User

  validates :user, uniqueness: { scope: :friend }
  validates :friend, uniqueness: { scope: :user }

end
