class CurrentUserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :first_name, :last_name, :full_name, :age, :avatar, :direct_message_list_ids

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