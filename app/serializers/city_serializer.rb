class CitySerializer < ActiveModel::Serializer
  attributes :id, :csc_source_id, :name, :latitude, :longitude
  has_one :state
  has_one :country
end
