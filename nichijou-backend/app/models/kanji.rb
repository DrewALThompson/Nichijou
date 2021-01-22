class Kanji < ApplicationRecord
    belongs_to :user
    validates :name, presence: true,
        length: { minimum: 2, maximum: 254},
        format: { with: /\A[一-龯ぁ-ゔゞァ-・ヽヾ゛゜ーa-zA-Z]/ },
        uniqueness: true
end
