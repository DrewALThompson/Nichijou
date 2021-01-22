class CreateKanjis < ActiveRecord::Migration[6.0]
  def change
    create_table :kanjis do |t|
      t.string :name
      t.string :meaning
      t.binary :image
      t.belongs_to :user

      t.timestamps
    end
  end
end
