class FriendRequest < ApplicationRecord
    #CRD
    
    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User

    validates :sender, uniqueness: { scope: :receiver }
    validates :receiver, uniqueness: { scope: :sender }
end
