class AddLocationInfoToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :country_id, :bigint, foreign_key: true
    add_column :users, :state_id, :bigint, foreign_key: true
    add_column :users, :city_id, :bigint, foreign_key: true
    add_column :users, :zip_code, :string
  end
end
