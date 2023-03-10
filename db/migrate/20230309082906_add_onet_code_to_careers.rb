class AddOnetCodeToCareers < ActiveRecord::Migration[7.0]
  def change
    add_column :careers, :onet_code, :integer
  end
end
