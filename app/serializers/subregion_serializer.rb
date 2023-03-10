class SubregionSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :region
end
