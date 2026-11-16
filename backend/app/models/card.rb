class Card < ApplicationRecord
  belongs_to :list
  has_many :checklist_items, -> { order(position: :asc) }, dependent: :destroy

  enum priority: { low: 0, medium: 1, high: 2, urgent: 3 }, _default: :medium

  validates :title, presence: true
end
