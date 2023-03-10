class CreateCities < ActiveRecord::Migration[7.0]
  def change
    create_table :cities do |t|
      t.integer :csc_source_id
      t.string :name
      t.belongs_to :state, null: false, foreign_key: true
      t.belongs_to :country, null: false, foreign_key: true
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
