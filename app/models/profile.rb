class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :interest_profile
end
