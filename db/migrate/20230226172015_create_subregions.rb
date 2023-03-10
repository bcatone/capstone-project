class CreateSubregions < ActiveRecord::Migration[7.0]
  def change
    create_table :subregions do |t|
      t.string :name
      t.belongs_to :region, null: false, foreign_key: true

      t.timestamps
    end
  end
end
