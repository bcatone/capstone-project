class Region < ApplicationRecord
    has_many :subregions
    has_many :countries
end
