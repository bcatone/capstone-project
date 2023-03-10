class DirectMessageSerializer < ActiveModel::Serializer
  attributes :id, :sender, :receiver, :created_at, :is_read?
  has_one :direct_message_list
  has_one :sender
  has_one :receiver
end
