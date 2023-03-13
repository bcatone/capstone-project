class ChangeLocationColumnsToStringsInUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :country_id
    add_column :users, :country, :string
    remove_column :users, :state_id
    add_column :users, :state, :string
    remove_column :users, :city_id
    add_column :users, :city, :string
  end
end
