class AddAnswerStringToInterestProfiles < ActiveRecord::Migration[7.0]
  def change
    add_column :interest_profiles, :answer_string, :string
  end
end
