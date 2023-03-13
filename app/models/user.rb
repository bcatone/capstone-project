class User < ApplicationRecord
    has_many :friendships, dependent: :destroy
    has_many :direct_message_lists, through: :friendships
    has_many :friends, through: :friendships

    has_many :user_projects, dependent: :destroy
    has_many :projects, through: :user_projects

    has_many :friend_requests

    has_many :posts
    
    has_many :senders, through: :friend_requests
    has_many :receivers, through: :friend_requests

    belongs_to :country
    belongs_to :state
    belongs_to :city

    has_one_attached :avatar, dependent: :destroy

    validates :username, presence: true, uniqueness: true
    validates :age, numericality: { greater_than_or_equal_to: 13 }

    has_secure_password

    def full_name
        "#{self.first_name} #{self.last_name}"
    end

    def age
        age = Date.today.year - self.date_of_birth.year
        age -= 1 if Date.today < self.date_of_birth + age.years
        age
    end

    def is_adult?
        self.age >= 18
    end

    def location
        "#{self.city.name}, #{self.state.isoCode}, #{self.country.isoCode}"
    end

    def connected_friends
        friendsArr = []

        friends = self.friends
        friends.each do |friend|
            friendsArr << friend
        end

        friendships = Friendship.where(friend: self)
        friendships.each do |friendship|
            friendsArr << friendship.user
        end

        friendsArr
    end

    def connected_friendships
        friendshipArr = []
        friendships = Friendship.where(friend: self)
        friendships.each do |friendship|
            friendshipArr << friendship
        end
        friendships = Friendship.where(user: self)
        friendships.each do |friendship|
            friendshipArr << friendship
        end
        friendshipArr
    end

    def conversation_info
        conversationArr = []
        friendships = self.connected_friendships
        friendships.each do |friendship|
            friendship_id = friendship.id
            direct_message_id = DirectMessageList.find_by(friendship_id: friendship_id).id
            if friendship.friend_id === self.id
                user_id = User.find_by!(id: friendship.user_id).id
                username = User.find_by!(id: friendship.user_id).username
            else
                user_id = User.find_by!(id: friendship.friend_id).id
                username = User.find_by!(id: friendship.friend_id).username
            end
            conversationArr << {direct_message_id: direct_message_id, friendship_id: friendship_id, user_id: user_id, username: username}
        end
        conversationArr
        
    end

    def is_friend?(user)
        friends = self.connected_friends
        bool = false
        friends.each do |friend|
            if friend.id == user.id
                return true
            end
        end
        false
    end

    def suggested_friends
        # Add more complex logic here later
        suggestions = [];
        users = User.where.not(id: self.id)
        users.each do |user|
            if !self.is_friend?(user)
                suggestions << user
            end
        end
        suggestions
    end

    def latitude
        self.city.latitude.to_f
    end

    def longitude
        self.city.longitude.to_f
    end

    def calculate_approx_distance_from_user(user)
        a = (self.latitude - user.latitude) ** 2
        b = (self.longitude - user.longitude) ** 2
        distance = Math::sqrt(a + b)
    end

    # def common_interests_with_user(user)
    #     self_interests = self.interests
    #     user_interests = user.interests

    #     common_interests = self_interests & user_interests
    #     common_interests
    # end

    # def common_hobby_with_user(user)
    #     self_hobbies = self.hobbies
    #     user_hobbies = user.hobbies

    #     common_hobbies = self_hobbies & user_hobbies
    #     common_hobbies
    # end


    

    # def suggested_partners
    #     # Add more complex logic here
    # end

end
