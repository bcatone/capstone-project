class CreateCountries < ActiveRecord::Migration[7.0]
  def change
    create_table :countries do |t|
      t.integer :csc_source_id
      t.string :name
      t.string :isoCode
      t.belongs_to :region, null: false, foreign_key: true
      t.belongs_to :subregion, null: false, foreign_key: true
      t.belongs_to :currency, null: false, foreign_key: true
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
