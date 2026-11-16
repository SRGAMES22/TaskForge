class Board < ApplicationRecord
  belongs_to :user
  has_many :lists, -> { order(position: :asc) }, dependent: :destroy

  validates :title, presence: true
end
