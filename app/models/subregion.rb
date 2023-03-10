class Subregion < ApplicationRecord
  has_many :countries
  belongs_to :region
end
