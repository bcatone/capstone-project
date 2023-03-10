class FriendshipSerializer < ActiveModel::Serializer
  attributes :friend, direct_message_list
  
  has_one :friend
  has_one :direct_message_list
end
