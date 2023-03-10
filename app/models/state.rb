class State < ApplicationRecord
  # R
  has_many :cities
  has_many :users
  belongs_to :country

  validates :name, presence: true
end
