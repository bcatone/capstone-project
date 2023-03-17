class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :upvotes, :downvotes, :username, :created_at

  belongs_to :user

  def username
    self.object.user.username
  end

  def created_at
    now = Time.now
    elapsed_hours = (now - self.object.created_at).seconds.in_hours.to_i
    elapsed_days = (elapsed_hours / 24).round
    elapsed_hours -= elapsed_days * 24
    "#{elapsed_days}d, #{elapsed_hours}h"
  end

end
