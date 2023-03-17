class DirectMessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :sender, :receiver, :created_at, :is_read?
  has_one :direct_message_list
  has_one :sender
  has_one :receiver

  def created_at
    self.object.created_at.strftime("%m/%d/%y %I:%M%p")
  end
end
