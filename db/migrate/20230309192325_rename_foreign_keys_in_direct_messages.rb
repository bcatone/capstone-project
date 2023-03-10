class RenameForeignKeysInDirectMessages < ActiveRecord::Migration[7.0]
  def change
    rename_column :direct_messages, :sender, :sender_id
    rename_column :direct_messages, :receiver, :receiver_id
  end
end
