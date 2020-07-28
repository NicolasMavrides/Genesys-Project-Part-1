# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

%w(aca15in aca15mhc aca15npm aca15hpc aca16avc aca16llr aca03cem ac4hh ac6gene).each do |username|
  account = User.where(username: username).first_or_initialize
  account.get_info_from_ldap
  account.save
end
