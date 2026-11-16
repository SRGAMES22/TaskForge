class CreateLists < ActiveRecord::Migration[7.2]
  def change
    create_table :lists do |t|
      t.references :board, null: false, foreign_key: true
      t.string :title, null: false
      t.integer :position, default: 0, null: false

      t.timestamps
    end
  end
end
