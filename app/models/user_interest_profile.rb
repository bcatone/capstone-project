class UserInterestProfile < ApplicationRecord
  belongs_to :user
  belongs_to :interest_profile
end
