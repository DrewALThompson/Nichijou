class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :datetime_of
      t.text :notes

      t.timestamps
    end
  end
end
