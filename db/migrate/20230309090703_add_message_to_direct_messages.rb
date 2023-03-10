class AddMessageToDirectMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :direct_messages, :message, :text
  end
end
