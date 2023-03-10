class CreateDirectMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_messages do |t|
      t.belongs_to :direct_message_list, null: false, foreign_key: true
      t.bigint :sender, null: false, foreign_key: true
      t.bigint :receiver, null: false, foreign_key: true
      t.boolean :is_read?

      t.timestamps
    end
  end
end
