class CreateUserCareerMatches < ActiveRecord::Migration[7.0]
  def change
    create_table :user_career_matches do |t|
      t.belongs_to :interest_profile, null: false, foreign_key: true

      t.timestamps
    end
  end
end
