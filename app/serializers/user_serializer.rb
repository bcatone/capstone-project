class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :first_name, :last_name, :full_name, :age, :location, :avatar, :career_title
  
  def avatar
    if object.avatar.attached?
      {
        url: rails_blob_url(object.avatar)
      }
    end
  end

end
