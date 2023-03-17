class AddCareerTitleToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :career_title, :string
  end
end
