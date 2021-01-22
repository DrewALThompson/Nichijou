class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :content
      t.date :date_created
      t.date :date_due
      t.belongs_to :user

      t.timestamps
    end
  end
end
