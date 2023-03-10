class UserCareerMatchSerializer < ActiveModel::Serializer
  attributes :id
  has_one :interest_profile
end
