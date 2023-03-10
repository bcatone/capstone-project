class CurrencySerializer < ActiveModel::Serializer
  attributes :id, :name, :abbreviation, :symbol
end
