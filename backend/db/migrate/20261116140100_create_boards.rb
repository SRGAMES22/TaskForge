class CreateBoards < ActiveRecord::Migration[7.2]
  def change
    create_table :boards do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.string :color, default: "#6366f1"

      t.timestamps
    end
  end
end
