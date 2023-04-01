class Project < ApplicationRecord
    has_many :user_projects
    has_many :users, through: :user_projects
    # has_one_attached :image

    validates :title, presence: true
end
