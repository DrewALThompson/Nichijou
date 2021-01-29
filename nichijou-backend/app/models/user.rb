class User < ApplicationRecord
    has_many :events
    has_secure_password
    validates :username, presence: true,
        length: { minimum: 2, maximum: 254},
        format: { with: /\A[一-龯ぁ-ゔゞァ-・ヽヾ゛゜ーa-zA-Z]/ },
        uniqueness: true
    validates :password, presence: true
end
