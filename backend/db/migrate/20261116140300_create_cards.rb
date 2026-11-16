class CreateCards < ActiveRecord::Migration[7.2]
  def change
    create_table :cards do |t|
      t.references :list, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.integer :position, default: 0, null: false
      t.integer :priority, default: 1, null: false
      t.date :due_date
      t.boolean :completed, default: false, null: false

      t.timestamps
    end
  end
end
