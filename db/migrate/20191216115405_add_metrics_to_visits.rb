class AddMetricsToVisits < ActiveRecord::Migration[6.0]
  def change
    add_column :visits, :score, :integer
    add_column :visits, :plan, :string
  end
end
