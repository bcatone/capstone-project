class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :clear
  has_one :user
end
