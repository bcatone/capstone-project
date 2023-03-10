class CreateInterestProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :interest_profiles do |t|
      t.integer :realistic
      t.integer :investigative
      t.integer :artistic
      t.integer :social
      t.integer :enterprising
      t.integer :conventional
      t.belongs_to :profile_id
      t.timestamps
    end
  end
end
