class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :sender

  belongs_to :sender
end
