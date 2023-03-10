class FriendSuggestionSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  :id, :username, :first_name, :last_name, :avatar, :full_name, :age

  def avatar_url
    url_for(object.avatar)
  end

  def avatar
    if object.avatar.attached?
      {
        url: rails_blob_url(object.avatar)
      }
    end
  end
  
end
