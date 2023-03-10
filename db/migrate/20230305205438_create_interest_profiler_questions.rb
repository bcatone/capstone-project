class CreateInterestProfilerQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :interest_profiler_questions do |t|
      t.string :area
      t.string :text

      t.timestamps
    end
  end
end
