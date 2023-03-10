class CreateStates < ActiveRecord::Migration[7.0]
  def change
    create_table :states do |t|
      t.integer :csc_source_id
      t.string :name
      t.string :isoCode
      t.belongs_to :country, null: false, foreign_key: true
      t.string :type
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
