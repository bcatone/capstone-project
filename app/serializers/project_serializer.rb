class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :url
end
