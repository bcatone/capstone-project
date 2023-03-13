class SetDefaultForIsReadInDirectMessages < ActiveRecord::Migration[7.0]
  def change
    change_column_default :direct_messages, :is_read?, from: nil, to: false
  end
end
