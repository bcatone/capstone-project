class CurrentUserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :first_name, :last_name, :full_name, :location, :age, :avatar, :conversation_info, :direct_message_lists, :career_title

  def avatar_url
    url_for(self.object.avatar)
  end

  def avatar
    if self.object.avatar.attached?
      {
        url: rails_blob_url(object.avatar)
      }
    end
  end

  def conversation_info
    self.object.conversation_info
  end

  def direct_message_lists
    friendship_ids = self.object.friendships.ids
    DirectMessageList.where(friendship_id: friendship_ids)
  end

end
