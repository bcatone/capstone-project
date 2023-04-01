class DirectMessageListSerializer < ActiveModel::Serializer
  attributes :id, :user_1_id, :user_2_id, :username1, :username2, :direct_messages, :num_unreads

  has_many :direct_messages

  def user_1_id
    id = self.object.friendship.user_id
    id
  end

  def user_2_id
    id = self.object.friendship.friend_id
    id
  end

  def username1
    username = self.object.friendship.user.username
    username
  end

  def username2
    username = self.object.friendship.friend.username
    username
  end

end
