class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :first_name, :last_name, :full_name, :age, :location, :avatar, :conversation_info
  
  def avatar
    if object.avatar.attached?
      {
        url: rails_blob_url(object.avatar)
      }
    end
  end

  def conversation_info
    self.object.conversation_info
  end

  def direct_message_lists
    friendship_ids = self.object.connected_friendships.ids
    DirectMessageList.where(friendship_id: friendship_ids)
  end
#
end
