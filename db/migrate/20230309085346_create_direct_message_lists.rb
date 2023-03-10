class CreateDirectMessageLists < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_message_lists do |t|
      t.belongs_to :friendship, null: false, foreign_key: true

      t.timestamps
    end
  end
end
