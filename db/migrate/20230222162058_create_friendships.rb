class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :friend_id, null: false,  foreign_key: true
      t.boolean :is_pending, null: false, default: false

      t.timestamps
    end
  end
end
