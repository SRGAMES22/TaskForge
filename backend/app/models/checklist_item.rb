class ChecklistItem < ApplicationRecord
  belongs_to :card

  validates :title, presence: true
end
