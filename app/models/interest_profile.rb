class InterestProfile < ApplicationRecord
    has_many :profiles

    validates :answer_string, length: { is: 60 }
    validates :realistic, numericality: { greater_than_or_equal_to: 0, only_integer: true }
    validates :investigative, numericality: { greater_than_or_equal_to: 0, only_integer: true }
    validates :artistic, numericality: { greater_than_or_equal_to: 0, only_integer: true }
    validates :social, numericality: { greater_than_or_equal_to: 0, only_integer: true }
    validates :enterprising, numericality: { greater_than_or_equal_to: 0, only_integer: true }
    validates :conventional, numericality: { greater_than_or_equal_to: 0, only_integer: true }
end
