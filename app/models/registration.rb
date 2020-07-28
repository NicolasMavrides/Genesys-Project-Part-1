# == Schema Information
#
# Table name: registrations
#
#  id         :integer          not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Registration < ApplicationRecord
  validates :email, presence: true
end
