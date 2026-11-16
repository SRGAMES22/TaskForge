class User < ApplicationRecord
  has_secure_password

  has_many :boards, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  enum subscription_type: { free: 0, mutant: 1 }, _default: :free
end
