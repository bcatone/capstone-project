class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :upvotes, :downvotes, :username, :created_at

  belongs_to :user

  def username
    self.object.user.username
  end

end
