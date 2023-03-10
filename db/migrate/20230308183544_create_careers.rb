class CreateCareers < ActiveRecord::Migration[7.0]
  def change
    create_table :careers do |t|
      t.string :title
      t.integer :code
      t.belongs_to :industry, foreign_key: true

      t.timestamps
    end
  end
end
