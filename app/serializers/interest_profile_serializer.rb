class InterestProfileSerializer < ActiveModel::Serializer
  attributes :id, :realistic, :investigative, :artistic, :social, :enterprising, :conventional
end
