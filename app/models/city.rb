class City < ApplicationRecord
  #R
  belongs_to :state
  belongs_to :country
  has_many :users
end
