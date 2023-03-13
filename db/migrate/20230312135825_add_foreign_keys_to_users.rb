class AddForeignKeysToUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :country, :string
    add_column :users, :country_id, :bigint
    add_foreign_key :users, :countries
    remove_column :users, :state, :string
    add_column :users, :state_id, :bigint
    add_foreign_key :users, :states
    remove_column :users, :city, :string
    add_column :users, :city_id, :bigint
    add_foreign_key :users, :cities
  end
end
