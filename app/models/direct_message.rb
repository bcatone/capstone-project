class DirectMessage < ApplicationRecord
  belongs_to :direct_message_list
  belongs_to :sender, class_name: :User
  belongs_to :receiver, class_name: :User

end
