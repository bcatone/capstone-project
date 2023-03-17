class FriendshipSerializer < ActiveModel::Serializer
  attributes :user, :friend, direct_message_list, :direct_message_list
  
  has_one :friend
  has_one :user
  has_one :direct_message_list

end
