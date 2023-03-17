class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :url, :image

  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end

end
