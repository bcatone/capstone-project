class CountryWithStatesSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :states
end
