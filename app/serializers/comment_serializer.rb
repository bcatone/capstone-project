class CommentSerializer < ActiveModel::Serializer
  attributes :id, :upvotes, :downvotes, :parent_id
  has_one :post_id
  has_one :user_is
end
