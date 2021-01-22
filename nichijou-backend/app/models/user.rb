class User < ApplicationRecord
    has_many :notes, :kanji
end
