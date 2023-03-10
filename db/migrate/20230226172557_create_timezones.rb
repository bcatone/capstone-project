class CreateTimezones < ActiveRecord::Migration[7.0]
  def change
    create_table :timezones do |t|
      t.string :zone_name
      t.string :time_zone_name
      t.integer :gmt_offset
      t.string :gmt_offset_name
      t.string :abbreviation

      t.timestamps
    end
  end
end
