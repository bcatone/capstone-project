class UserPost < ApplicationRecord
  attributes :id, :post_id
  belongs_to :post
end
