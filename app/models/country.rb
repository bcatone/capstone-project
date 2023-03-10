class Country < ApplicationRecord
  # R
  has_many :states
  has_many :cities
  has_many :users
  belongs_to :region
  belongs_to :subregion
  belongs_to :currency

  validates :name, presence: true

end
