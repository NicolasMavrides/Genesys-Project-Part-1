class CreateRegistrations < ActiveRecord::Migration[6.0]
  def change
    create_table :registrations do |t|
      t.string :email
      t.string :name

      t.timestamps
    end
  end
end
