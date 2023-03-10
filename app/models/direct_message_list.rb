class DirectMessageList < ApplicationRecord
  belongs_to :friendship
  has_many :direct_messages, dependent: :destroy
  has_many :users, through: :direct_messages

  # def messages
  #   direct_messages = self.direct_messages
  #   messages = []
  #   direct_messages.each do |message|
      
  #   end
  # end
end
