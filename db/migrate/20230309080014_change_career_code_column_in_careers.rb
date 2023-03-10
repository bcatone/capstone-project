class ChangeCareerCodeColumnInCareers < ActiveRecord::Migration[7.0]
  def change
    remove_column :careers, :code
    add_column :careers, :code, :string
  end
end
