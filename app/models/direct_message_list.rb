class DirectMessageList < ApplicationRecord
  belongs_to :friendship
  has_many :direct_messages, dependent: :destroy
  has_many :users, through: :direct_messages
  
  def num_unreads
    n = 0
    messages = self.direct_messages
    messages.each do |message|
      if !message.is_read?
        n += 1
      end
    end
    n
  end
end
