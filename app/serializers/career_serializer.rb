class CareerSerializer < ActiveModel::Serializer
  attributes :id, :title, :code
  has_one :industry
end
