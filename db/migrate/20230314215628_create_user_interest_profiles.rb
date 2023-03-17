class CreateUserInterestProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :user_interest_profiles do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :interest_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
