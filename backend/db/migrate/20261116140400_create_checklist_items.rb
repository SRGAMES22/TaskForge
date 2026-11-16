class CreateChecklistItems < ActiveRecord::Migration[7.2]
  def change
    create_table :checklist_items do |t|
      t.references :card, null: false, foreign_key: true
      t.string :title, null: false
      t.boolean :completed, default: false, null: false
      t.integer :position, default: 0, null: false

      t.timestamps
    end
  end
end
